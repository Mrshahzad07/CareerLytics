package com.careerlytics.backend.controller;

import com.careerlytics.backend.dto.JobListing;
import com.careerlytics.backend.model.Resume;
import com.careerlytics.backend.model.User;
import com.careerlytics.backend.repository.ResumeRepository;
import com.careerlytics.backend.repository.UserRepository;
import com.careerlytics.backend.service.JobRecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobRecommendationService jobRecommendationService;
    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;

    public JobController(JobRecommendationService jobRecommendationService, UserRepository userRepository, ResumeRepository resumeRepository) {
        this.jobRecommendationService = jobRecommendationService;
        this.userRepository = userRepository;
        this.resumeRepository = resumeRepository;
    }

    @GetMapping("/recommend")
    public ResponseEntity<List<JobListing>> getRecommendedJobs() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        // Get latest resume skills
        List<Resume> resumes = resumeRepository.findByUserId(user.getId());
        List<String> skills = new ArrayList<>();
        if (!resumes.isEmpty()) {
            // Use the most recent resume's skills
            skills = resumes.get(resumes.size() - 1).getSkills();
        }

        return ResponseEntity.ok(jobRecommendationService.getRecommendations(skills));
    }
}
