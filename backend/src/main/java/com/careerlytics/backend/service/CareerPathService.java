package com.careerlytics.backend.service;

import com.careerlytics.backend.dto.CareerPath;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class CareerPathService {

    public List<CareerPath> getCareerPaths(List<String> skills) {
        if (skills == null || skills.isEmpty()) {
            return getGeneralPath();
        }

        // Normalize skills for easier matching
        long javaCount = countMatches(skills, "Java", "Spring", "Hibernate", "Maven", "J2EE");
        long pythonCount = countMatches(skills, "Python", "Django", "Flask", "Pandas", "NumPy");
        long jsCount = countMatches(skills, "JavaScript", "React", "Angular", "Vue", "Node", "TypeScript");
        long dataCount = countMatches(skills, "SQL", "Tableau", "PowerBI", "Machine Learning", "Data", "Spark", "Hadoop");
        long devOpsCount = countMatches(skills, "AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Linux", "Cloud");
        long mobileCount = countMatches(skills, "Android", "iOS", "Flutter", "React Native", "Swift", "Kotlin");
        long qaCount = countMatches(skills, "Selenium", "Testing", "JIRA", "JUnit", "TestNG", "Cypress");

        // Determine dominant path
        if (dataCount >= 2 && pythonCount >= 1) {
            return getDataSciencePath();
        } else if (devOpsCount >= 2) {
            return getDevOpsPath();
        } else if (mobileCount >= 2) {
            return getMobilePath();
        } else if (qaCount >= 2) {
            return getQAPath();
        } else if (javaCount >= 1 && jsCount >= 1) {
            return getFullStackPath();
        } else if (javaCount >= 1) {
            return getBackendPath();
        } else if (jsCount >= 1) {
            return getFrontendPath();
        } else if (pythonCount >= 1) {
            return getPythonPath();
        } else {
            return getGeneralPath();
        }
    }

    private long countMatches(List<String> userSkills, String... keywords) {
        return userSkills.stream()
                .filter(skill -> Arrays.stream(keywords)
                        .anyMatch(k -> skill.toLowerCase().contains(k.toLowerCase())))
                .count();
    }

    private List<CareerPath> getBackendPath() {
        return Arrays.asList(
            CareerPath.builder()
                .currentLevel("Junior Java Developer")
                .nextLevel("Senior Backend Engineer")
                .description("Focus on system design, microservices, and cloud deployment.")
                .requiredSkills(Arrays.asList("Advanced Java", "Microservices", "AWS/Azure", "System Design", "Kafka"))
                .estimatedSalary("₹15L - ₹25L")
                .recommendedCourses(Arrays.asList("AWS Certified Solutions Architect", "System Design Interview Guide"))
                .estimatedTimeMonths(24)
                .build(),
            CareerPath.builder()
                .currentLevel("Senior Backend Engineer")
                .nextLevel("Staff Engineer / Architect")
                .description("Lead technical strategy, design scalable architectures, and mentor teams.")
                .requiredSkills(Arrays.asList("Distributed Systems", "High Scalability", "Team Leadership"))
                .estimatedSalary("₹35L+")
                .recommendedCourses(Arrays.asList("Designing Data-Intensive Applications", "Engineering Management"))
                .estimatedTimeMonths(36)
                .build()
        );
    }

    private List<CareerPath> getFrontendPath() {
        return Arrays.asList(
            CareerPath.builder()
                .currentLevel("Frontend Developer")
                .nextLevel("Senior Frontend Engineer")
                .description("Master performance optimization, state management, and modern frameworks.")
                .requiredSkills(Arrays.asList("Next.js", "Performance Optimization", "Testing (Jest/Cypress)", "TypeScript"))
                .estimatedSalary("₹12L - ₹22L")
                .recommendedCourses(Arrays.asList("Advanced React Patterns", "Web Performance Optimization"))
                .estimatedTimeMonths(18)
                .build(),
            CareerPath.builder()
                .currentLevel("Senior Frontend Engineer")
                .nextLevel("Principal Frontend Engineer")
                .description("Drive frontend architecture, design systems, and user experience strategy.")
                .requiredSkills(Arrays.asList("Micro-frontends", "Design Systems", "Web Assembly"))
                .estimatedSalary("₹28L+")
                .recommendedCourses(Arrays.asList("Frontend Architecture Masterclass"))
                .estimatedTimeMonths(30)
                .build()
        );
    }
    
    private List<CareerPath> getFullStackPath() {
        return Arrays.asList(
            CareerPath.builder()
                .currentLevel("Full Stack Developer")
                .nextLevel("Senior Full Stack Engineer")
                .description("Deepen knowledge in both frontend and backend, plus DevOps.")
                .requiredSkills(Arrays.asList("Kubernetes", "CI/CD", "GraphQL", "Advanced System Design"))
                .estimatedSalary("₹18L - ₹30L")
                .recommendedCourses(Arrays.asList("Docker & Kubernetes Mastery", "Full Stack Open"))
                .estimatedTimeMonths(24)
                .build(),
             CareerPath.builder()
                .currentLevel("Senior Full Stack Engineer")
                .nextLevel("Engineering Manager")
                .description("Transition from individual contributor to managing engineering teams.")
                .requiredSkills(Arrays.asList("People Management", "Project Management", "Hiring"))
                .estimatedSalary("₹35L - ₹50L")
                .recommendedCourses(Arrays.asList("The Manager's Path", "PMP Certification"))
                .estimatedTimeMonths(36)
                .build()
        );
    }

    private List<CareerPath> getDataSciencePath() {
        return Arrays.asList(
            CareerPath.builder()
                .currentLevel("Data Analyst")
                .nextLevel("Data Scientist")
                .description("Move from analyzing past data to predicting future trends using ML.")
                .requiredSkills(Arrays.asList("Machine Learning", "Deep Learning", "Statistics", "Big Data"))
                .estimatedSalary("₹15L - ₹25L")
                .recommendedCourses(Arrays.asList("Andrew Ng's Machine Learning", "Fast.ai"))
                .estimatedTimeMonths(18)
                .build(),
            CareerPath.builder()
                .currentLevel("Data Scientist")
                .nextLevel("AI Research Scientist")
                .description("Conduct cutting-edge research in AI/ML algorithms.")
                .requiredSkills(Arrays.asList("Advanced Math", "Research Papers", "NLP/Computer Vision"))
                .estimatedSalary("₹30L - ₹60L")
                .recommendedCourses(Arrays.asList("Deep Learning Specialization"))
                .estimatedTimeMonths(36)
                .build()
        );
    }

    private List<CareerPath> getDevOpsPath() {
        return Arrays.asList(
            CareerPath.builder()
                .currentLevel("DevOps Engineer")
                .nextLevel("Senior SRE (Site Reliability Engineer)")
                .description("Focus on reliability, scalability, and automating infrastructure.")
                .requiredSkills(Arrays.asList("Advanced Kubernetes", "Observability", "Chaos Engineering", "Go"))
                .estimatedSalary("₹20L - ₹35L")
                .recommendedCourses(Arrays.asList("Google SRE Book", "CKA Certification"))
                .estimatedTimeMonths(24)
                .build(),
            CareerPath.builder()
                .currentLevel("Senior SRE")
                .nextLevel("Head of Infrastructure")
                .description("Oversee the entire cloud infrastructure and platform engineering.")
                .requiredSkills(Arrays.asList("Cloud Strategy", "FinOps", "Security Compliance"))
                .estimatedSalary("₹40L+")
                .recommendedCourses(Arrays.asList("Cloud Architecture Patterns"))
                .estimatedTimeMonths(36)
                .build()
        );
    }

    private List<CareerPath> getMobilePath() {
        return Arrays.asList(
            CareerPath.builder()
                .currentLevel("Mobile Developer")
                .nextLevel("Senior Mobile Engineer")
                .description("Master native APIs, performance, and advanced UI/UX.")
                .requiredSkills(Arrays.asList("Advanced Kotlin/Swift", "CI/CD for Mobile", "System Design"))
                .estimatedSalary("₹15L - ₹25L")
                .recommendedCourses(Arrays.asList("Advanced Android/iOS Development"))
                .estimatedTimeMonths(20)
                .build()
        );
    }

    private List<CareerPath> getQAPath() {
        return Arrays.asList(
            CareerPath.builder()
                .currentLevel("QA Engineer")
                .nextLevel("SDET (Software Development Engineer in Test)")
                .description("Focus on building automated testing frameworks and tools.")
                .requiredSkills(Arrays.asList("Java/Python", "Selenium Grid", "API Testing", "CI/CD Integration"))
                .estimatedSalary("₹12L - ₹20L")
                .recommendedCourses(Arrays.asList("Test Automation University", "Clean Code"))
                .estimatedTimeMonths(18)
                .build()
        );
    }

    private List<CareerPath> getPythonPath() {
        return Arrays.asList(
            CareerPath.builder()
                .currentLevel("Python Developer")
                .nextLevel("Senior Python Engineer")
                .description("Specialize in high-performance Python applications.")
                .requiredSkills(Arrays.asList("AsyncIO", "Multithreading", "FastAPI", "Architecture"))
                .estimatedSalary("₹14L - ₹24L")
                .recommendedCourses(Arrays.asList("Expert Python Programming"))
                .estimatedTimeMonths(24)
                .build()
        );
    }
    
    private List<CareerPath> getGeneralPath() {
        return Collections.singletonList(
            CareerPath.builder()
                .currentLevel("Entry Level")
                .nextLevel("Specialist")
                .description("Choose a specialization to advance your career. Add more skills to your resume to get a specific path.")
                .requiredSkills(Arrays.asList("Specialized Skillset", "Project Experience"))
                .estimatedSalary("₹5L - ₹10L")
                .recommendedCourses(Arrays.asList("CS50", "Udemy Bootcamps"))
                .estimatedTimeMonths(12)
                .build()
        );
    }
}
