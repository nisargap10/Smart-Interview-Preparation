package com.smartinterview.controller;

import com.smartinterview.entity.InterviewQuestion;
import com.smartinterview.service.InterviewQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interview")
@RequiredArgsConstructor
public class InterviewQuestionController {

    private final InterviewQuestionService interviewQuestionService;

    @GetMapping("/{category}")
    public ResponseEntity<List<InterviewQuestion>> getQuestionsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(interviewQuestionService.getQuestionsByCategory(category));
    }

    @PostMapping
    public ResponseEntity<InterviewQuestion> addQuestion(@RequestBody InterviewQuestion question) {
        return ResponseEntity.ok(interviewQuestionService.addQuestion(question));
    }
}
