package com.careerlytics.backend.service;

import com.careerlytics.backend.dto.JobListing;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class JobRecommendationService {

    private static final List<JobListing> JOB_DATABASE = new ArrayList<>();

    static {
        initializeJobDatabase();
    }

    public List<JobListing> getRecommendations(List<String> userSkills) {
        if (userSkills == null || userSkills.isEmpty()) {
            return Collections.emptyList();
        }

        return JOB_DATABASE.stream()
                .map(job -> new JobMatch(job, calculateMatchScore(job, userSkills)))
                .filter(match -> match.score > 0)
                .sorted((m1, m2) -> Long.compare(m2.score, m1.score)) // Sort by score descending
                .map(match -> match.job)
                .limit(20) // Limit to top 20 recommendations
                .collect(Collectors.toList());
    }

    private long calculateMatchScore(JobListing job, List<String> userSkills) {
        return job.getRequiredSkills().stream()
                .filter(skill -> userSkills.stream()
                        .anyMatch(us -> us.equalsIgnoreCase(skill) || us.toLowerCase().contains(skill.toLowerCase())))
                .count();
    }

    private static void initializeJobDatabase() {
        // Java / Backend
        addJob("Junior Java Developer", "TechCorp Inc.", "Bangalore, India", "Full-time", "₹6L - ₹10L", "LinkedIn", Arrays.asList("Java", "Spring Boot", "SQL", "Hibernate"));
        addJob("Senior Java Engineer", "FinTech Solutions", "Mumbai, India", "Full-time", "₹20L - ₹35L", "Naukri", Arrays.asList("Java", "Microservices", "Kafka", "AWS", "Spring Boot"));
        addJob("Backend Developer", "InnovateX", "Remote", "Full-time", "₹12L - ₹18L", "Indeed", Arrays.asList("Java", "PostgreSQL", "Redis", "Docker"));
        
        // Web Development
        addJob("React Frontend Engineer", "Creative Solutions", "Remote", "Contract", "₹8L - ₹15L", "Naukri", Arrays.asList("React", "JavaScript", "CSS", "Tailwind", "Redux"));
        addJob("Full Stack Developer", "StartupX", "Hyderabad, India", "Full-time", "₹12L - ₹20L", "Indeed", Arrays.asList("Java", "React", "AWS", "Docker", "TypeScript"));
        addJob("Frontend Developer", "WebWizards", "Pune, India", "Full-time", "₹6L - ₹12L", "LinkedIn", Arrays.asList("JavaScript", "HTML", "CSS", "Vue.js"));
        addJob("MERN Stack Developer", "CodeCrafters", "Bangalore, India", "Full-time", "₹10L - ₹16L", "Instahyre", Arrays.asList("MongoDB", "Express", "React", "Node.js"));
        addJob("Angular Developer", "Enterprise Sys", "Chennai, India", "Full-time", "₹8L - ₹14L", "Naukri", Arrays.asList("Angular", "TypeScript", "RxJS", "HTML"));

        // Python / Data
        addJob("Data Analyst", "DataWiz", "Pune, India", "Full-time", "₹5L - ₹9L", "LinkedIn", Arrays.asList("Python", "SQL", "Tableau", "Excel"));
        addJob("Machine Learning Engineer", "AI Frontiers", "Bangalore, India", "Full-time", "₹15L - ₹25L", "LinkedIn", Arrays.asList("Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning"));
        addJob("Python Developer", "ScriptMasters", "Remote", "Full-time", "₹10L - ₹18L", "Indeed", Arrays.asList("Python", "Django", "Flask", "PostgreSQL"));
        addJob("Data Scientist", "BigData Corp", "Gurgaon, India", "Full-time", "₹18L - ₹30L", "Naukri", Arrays.asList("Python", "R", "Machine Learning", "SQL", "Spark"));

        // DevOps / Cloud
        addJob("DevOps Engineer", "CloudScale", "Bangalore, India", "Full-time", "₹14L - ₹22L", "LinkedIn", Arrays.asList("AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"));
        addJob("Cloud Architect", "SkyNet", "Hyderabad, India", "Full-time", "₹30L - ₹50L", "Naukri", Arrays.asList("AWS", "Azure", "Cloud Architecture", "Security"));
        addJob("SRE", "Reliability Inc", "Remote", "Full-time", "₹20L - ₹35L", "Indeed", Arrays.asList("Linux", "Go", "Python", "Ansible", "Prometheus"));

        // Mobile
        addJob("Android Developer", "Appify", "Noida, India", "Full-time", "₹8L - ₹15L", "LinkedIn", Arrays.asList("Android", "Kotlin", "Java", "Jetpack Compose"));
        addJob("iOS Developer", "AppleTech", "Bangalore, India", "Full-time", "₹12L - ₹20L", "Naukri", Arrays.asList("iOS", "Swift", "Objective-C", "Xcode"));
        addJob("Flutter Developer", "CrossPlatform Co", "Remote", "Contract", "₹10L - ₹18L", "Indeed", Arrays.asList("Flutter", "Dart", "Firebase", "Mobile"));

        // C++ / Embedded
        addJob("C++ Developer", "SysCore", "Pune, India", "Full-time", "₹10L - ₹18L", "LinkedIn", Arrays.asList("C++", "STL", "Multithreading", "Linux"));
        addJob("Embedded Systems Engineer", "ChipWorks", "Bangalore, India", "Full-time", "₹12L - ₹22L", "Naukri", Arrays.asList("C", "C++", "Embedded", "RTOS", "Microcontrollers"));

        // .NET
        addJob(".NET Developer", "SoftServe", "Chennai, India", "Full-time", "₹8L - ₹14L", "Indeed", Arrays.asList("C#", ".NET", "ASP.NET", "SQL Server"));
        
        // Testing
        addJob("QA Automation Engineer", "TestPro", "Hyderabad, India", "Full-time", "₹7L - ₹13L", "LinkedIn", Arrays.asList("Selenium", "Java", "TestNG", "JIRA"));
    }

    private static void addJob(String title, String company, String location, String type, String salary, String platform, List<String> skills) {
        JOB_DATABASE.add(JobListing.builder()
                .id(UUID.randomUUID().toString())
                .title(title)
                .company(company)
                .location(location)
                .type(type)
                .requiredSkills(skills)
                .salaryRange(salary)
                .applyLink("https://www." + platform.toLowerCase() + ".com/jobs") // Generic link
                .postedDate((1 + (int)(Math.random() * 5)) + " days ago")
                .platform(platform)
                .build());
    }

    private static class JobMatch {
        JobListing job;
        long score;

        JobMatch(JobListing job, long score) {
            this.job = job;
            this.score = score;
        }
    }
}
