package com.careerlytics.backend.controller;

import com.careerlytics.backend.model.Resume;
import com.careerlytics.backend.model.User;
import com.careerlytics.backend.repository.ResumeRepository;
import com.careerlytics.backend.repository.UserRepository;
import com.careerlytics.backend.service.AtsScoreService;
import com.careerlytics.backend.service.FileStorageService;
import com.careerlytics.backend.service.ResumeParserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final FileStorageService fileStorageService;
    private final ResumeParserService resumeParserService;
    private final AtsScoreService atsScoreService;
    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    public ResumeController(FileStorageService fileStorageService, ResumeParserService resumeParserService, AtsScoreService atsScoreService, ResumeRepository resumeRepository, UserRepository userRepository) {
        this.fileStorageService = fileStorageService;
        this.resumeParserService = resumeParserService;
        this.atsScoreService = atsScoreService;
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<Resume> uploadResume(@RequestParam("file") MultipartFile file) {
        try {
            // Get current user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

            // Store file
            String filePath = fileStorageService.storeFile(file);

            // Parse file
            String text = resumeParserService.extractText(filePath);
            String extractedEmail = resumeParserService.extractEmail(text);
            String extractedPhone = resumeParserService.extractPhone(text);
            List<String> skills = resumeParserService.extractSkills(text);

            // Calculate ATS Score
            int score = atsScoreService.calculateScore(text, skills);
            List<String> missingKeywords = atsScoreService.getMissingKeywords(text);
            String suggestions = atsScoreService.getSuggestions(score);

            // Save to DB
            Resume resume = new Resume();
            resume.setUser(user);
            resume.setFileName(file.getOriginalFilename());
            resume.setFilePath(filePath);
            resume.setFileType(file.getContentType());
            resume.setRawText(text); // Be careful with large text
            resume.setEmail(extractedEmail);
            resume.setPhone(extractedPhone);
            resume.setSkills(skills);
            resume.setAtsScore(score);
            resume.setMissingKeywords(missingKeywords);
            resume.setImprovementSuggestions(suggestions);

            Resume savedResume = resumeRepository.save(resume);

            return ResponseEntity.ok(savedResume);

        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resume> getResume(@PathVariable Long id) {
        return resumeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/user")
    public ResponseEntity<List<Resume>> getUserResumes() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        
        return ResponseEntity.ok(resumeRepository.findByUserId(user.getId()));
    }
}
