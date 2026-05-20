package com.smartinterview.service;

import com.smartinterview.entity.Question;
import com.smartinterview.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository repository;

    public List<Question> getAllQuestions() {
        return repository.findAll();
    }

    public List<Question> getQuestionsByCategory(String category) {
        return repository.findByCategory(category);
    }

    public Question addQuestion(Question question) {
        return repository.save(question);
    }
}
