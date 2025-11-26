package com.careerlytics.backend.service;

import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.apache.tika.metadata.Metadata;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ResumeParserService {

    private final Tika tika = new Tika();

    public String extractText(String filePath) throws IOException {
        try {
            return tika.parseToString(new File(filePath));
        } catch (TikaException e) {
            throw new IOException("Failed to parse file: " + filePath, e);
        }
    }

    public String extractEmail(String text) {
        String emailRegex = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) {
            return matcher.group();
        }
        return null;
    }

    public String extractPhone(String text) {
        // Matches:
        // +91 9876543210
        // 987-654-3210
        // (123) 456-7890
        // 9876543210
        String phoneRegex = "(\\+\\d{1,3}[-.\\s]?)?(\\(?\\d{3}\\)?[-.\\s]?)?\\d{3}[-.\\s]?\\d{4}";
        Pattern pattern = Pattern.compile(phoneRegex);
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) {
            return matcher.group().trim();
        }
        return null;
    }
    
    // Basic keyword extraction (Mock implementation for now)
    public List<String> extractSkills(String text) {
        List<String> foundSkills = new ArrayList<>();
        // Expanded skill list
        String[] commonSkills = {
            "Java", "Python", "React", "Spring Boot", "SQL", "JavaScript", "HTML", "CSS", 
            "AWS", "Docker", "Kubernetes", "Node.js", "Angular", "Vue.js", "C++", "C#",
            "Machine Learning", "Data Analysis", "Project Management", "Git", "Linux"
        };
        
        String lowerText = text.toLowerCase();
        
        for (String skill : commonSkills) {
            // Escape special characters in skill name for regex (e.g., C++, C#)
            String escapedSkill = Pattern.quote(skill.toLowerCase());
            // Match whole words only
            Pattern pattern = Pattern.compile("\\b" + escapedSkill + "\\b");
            Matcher matcher = pattern.matcher(lowerText);
            
            if (matcher.find()) {
                foundSkills.add(skill);
            }
        }
        return foundSkills;
    }
}
