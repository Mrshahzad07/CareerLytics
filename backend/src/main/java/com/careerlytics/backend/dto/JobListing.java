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
public class JobListing {
    private String id;
    private String title;
    private String company;
    private String location;
    private String type; // Full-time, Contract, etc.
    private List<String> requiredSkills;
    private String salaryRange;
    private String applyLink;
    private String postedDate;
    private String platform; // LinkedIn, Indeed, etc.
}
