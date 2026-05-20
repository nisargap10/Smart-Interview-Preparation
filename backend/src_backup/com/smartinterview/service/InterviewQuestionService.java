package com.smartinterview.service;

import com.smartinterview.entity.InterviewQuestion;
import com.smartinterview.repository.InterviewQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewQuestionService {

    private final InterviewQuestionRepository repository;

    public List<InterviewQuestion> getQuestionsByCategory(String category) {
        return repository.findByCategory(category);
    }

    public InterviewQuestion addQuestion(InterviewQuestion question) {
        return repository.save(question);
    }
}
