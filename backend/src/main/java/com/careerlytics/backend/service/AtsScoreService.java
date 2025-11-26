package com.careerlytics.backend.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AtsScoreService {

    public int calculateScore(String text, List<String> skills) {
        int score = 0;
        
        // 1. Content Length (10 pts)
        if (text.length() > 500 && text.length() < 5000) {
            score += 10;
        }
        
        // 2. Contact Info (10 pts)
        // Assuming if we parsed it, it's there. But we check text again or rely on parser results.
        // For simplicity, let's assume if skills > 0, we have some content.
        
        // 3. Skills Match (40 pts)
        if (!skills.isEmpty()) {
            score += Math.min(skills.size() * 5, 40);
        }
        
        // 4. Keywords/Sections (40 pts)
        String lowerText = text.toLowerCase();
        String[] sections = {"education", "experience", "projects", "skills", "certifications"};
        for (String section : sections) {
            if (lowerText.contains(section)) {
                score += 8;
            }
        }
        
        return score;
    }
    
    public List<String> getMissingKeywords(String text) {
        List<String> missing = new ArrayList<>();
        String lowerText = text.toLowerCase();
        String[] importantKeywords = {"teamwork", "communication", "leadership", "problem solving", "agile"};
        
        for (String keyword : importantKeywords) {
            if (!lowerText.contains(keyword)) {
                missing.add(keyword);
            }
        }
        return missing;
    }
    
    public String getSuggestions(int score) {
        if (score >= 80) return "Excellent resume! Ready for application.";
        if (score >= 60) return "Good resume, but could use more keywords and action verbs.";
        return "Needs improvement. Focus on adding standard sections and relevant skills.";
    }
}
