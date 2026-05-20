package com.smartinterview.controller;

import com.smartinterview.entity.Question;
import com.smartinterview.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions(@RequestParam(required = false) String category) {
        if (category != null) {
            return ResponseEntity.ok(questionService.getQuestionsByCategory(category));
        }
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    @PostMapping
    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        return ResponseEntity.ok(questionService.addQuestion(question));
    }
}
