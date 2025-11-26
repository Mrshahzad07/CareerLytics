package com.careerlytics.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DashboardStats {
    private int totalResumesAnalyzed;
    private int averageAtsScore;
    private int jobsRecommended;
    private List<Integer> recentScores;
    private Map<String, Integer> skillDistribution;
}
