package com.careerlytics.backend.controller;

import com.careerlytics.backend.model.Feedback;
import com.careerlytics.backend.repository.FeedbackRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackRepository feedbackRepository;

    public FeedbackController(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    @PostMapping
    public ResponseEntity<Feedback> submitFeedback(@RequestBody Feedback feedback) {
        return ResponseEntity.ok(feedbackRepository.save(feedback));
    }

    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        // In a real app, secure this endpoint for admins only
        return ResponseEntity.ok(feedbackRepository.findAll());
    }
}
