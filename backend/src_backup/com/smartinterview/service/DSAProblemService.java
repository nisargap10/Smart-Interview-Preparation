package com.smartinterview.service;

import com.smartinterview.entity.DSAProblem;
import com.smartinterview.repository.DSAProblemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DSAProblemService {

    private final DSAProblemRepository repository;

    public List<DSAProblem> getUserProblems(Long userId) {
        return repository.findByUserId(userId);
    }

    public DSAProblem addProblem(DSAProblem problem) {
        return repository.save(problem);
    }

    public DSAProblem updateProblem(Long id, DSAProblem updatedProblem) {
        return repository.findById(id).map(problem -> {
            problem.setTitle(updatedProblem.getTitle());
            problem.setDifficulty(updatedProblem.getDifficulty());
            problem.setTopic(updatedProblem.getTopic());
            problem.setSolved(updatedProblem.isSolved());
            problem.setNotes(updatedProblem.getNotes());
            return repository.save(problem);
        }).orElseThrow(() -> new RuntimeException("Problem not found"));
    }
}
