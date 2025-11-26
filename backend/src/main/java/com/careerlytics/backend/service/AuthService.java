package com.careerlytics.backend.service;

import com.careerlytics.backend.dto.AuthDto;
import com.careerlytics.backend.model.User;
import com.careerlytics.backend.repository.UserRepository;
import com.careerlytics.backend.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    public AuthDto.AuthenticationResponse register(AuthDto.RegisterRequest request) {
        var user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        
        userRepository.save(user);
        
        // Create UserDetails for token generation
        var userDetails = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                java.util.Collections.emptyList()
        );
        
        var jwtToken = jwtUtil.generateToken(userDetails);
        return AuthDto.AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthDto.AuthenticationResponse login(AuthDto.LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
                
        var userDetails = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                java.util.Collections.emptyList()
        );
        
        var jwtToken = jwtUtil.generateToken(userDetails);
        return AuthDto.AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
