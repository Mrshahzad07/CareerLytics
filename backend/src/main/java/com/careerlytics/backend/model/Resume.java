package com.careerlytics.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "resumes")
@Data
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String fileName;
    private String filePath;
    private String fileType;

    // Parsed Details
    private String candidateName;
    private String email;
    private String phone;
    
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> skills;
    
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> education;
    
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> experience;

    @Column(length = 5000) // Allow longer text for extracted content if needed
    private String rawText;

    private int atsScore;
    
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> missingKeywords;
    
    private String improvementSuggestions;
}
