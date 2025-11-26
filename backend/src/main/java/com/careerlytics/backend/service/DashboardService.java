package com.careerlytics.backend.service;

import com.careerlytics.backend.dto.DashboardStats;
import com.careerlytics.backend.model.Resume;
import com.careerlytics.backend.repository.ResumeRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final ResumeRepository resumeRepository;
    private final JobRecommendationService jobRecommendationService;

    public DashboardService(ResumeRepository resumeRepository, JobRecommendationService jobRecommendationService) {
        this.resumeRepository = resumeRepository;
        this.jobRecommendationService = jobRecommendationService;
    }

    public DashboardStats getUserStats(Long userId) {
        List<Resume> resumes = resumeRepository.findByUserId(userId);
        
        int totalResumes = resumes.size();
        int avgScore = resumes.isEmpty() ? 0 : (int) resumes.stream().mapToInt(Resume::getAtsScore).average().orElse(0);
        
        // Get recommended jobs count based on actual matching logic
        int jobsRecommended = 0;
        if (!resumes.isEmpty()) {
            List<String> skills = resumes.get(resumes.size() - 1).getSkills();
            jobsRecommended = jobRecommendationService.getRecommendations(skills).size();
        }
        
        // Get last 5 scores
        List<Integer> recentScores = resumes.stream()
                .map(Resume::getAtsScore)
                .sorted((a, b) -> 0) // Keep order as is for now
                .limit(5)
                .collect(Collectors.toList());
        
        // Calculate skill distribution
        Map<String, Integer> skillDist = new HashMap<>();
        for (Resume r : resumes) {
            for (String skill : r.getSkills()) {
                skillDist.put(skill, skillDist.getOrDefault(skill, 0) + 1);
            }
        }
        
        return DashboardStats.builder()
                .totalResumesAnalyzed(totalResumes)
                .averageAtsScore(avgScore)
                .jobsRecommended(jobsRecommended)
                .recentScores(recentScores)
                .skillDistribution(skillDist)
                .build();
    }
}
