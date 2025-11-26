package com.careerlytics.backend.controller;

import com.careerlytics.backend.dto.AuthDto;
import com.careerlytics.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthDto.AuthenticationResponse> register(
            @RequestBody AuthDto.RegisterRequest request
    ) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthDto.AuthenticationResponse> login(
            @RequestBody AuthDto.LoginRequest request
    ) {
        return ResponseEntity.ok(authService.login(request));
    }
}
