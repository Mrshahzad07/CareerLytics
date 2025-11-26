package com.careerlytics.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CareerPath {
    private String currentLevel;
    private String nextLevel;
    private String description;
    private List<String> requiredSkills;
    private String estimatedSalary;
    private List<String> recommendedCourses;
    private int estimatedTimeMonths;
}
