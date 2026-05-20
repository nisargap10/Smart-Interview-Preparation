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

    public List<DSAProblem> getAllProblems() {
        return repository.findAll();
    }

    public DSAProblem getProblem(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Problem not found"));
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
            problem.setDescription(updatedProblem.getDescription());
            problem.setExamples(updatedProblem.getExamples());
            problem.setConstraints(updatedProblem.getConstraints());
            problem.setTags(updatedProblem.getTags());
            problem.setYoutubeLink(updatedProblem.getYoutubeLink());
            problem.setLeetcodeLink(updatedProblem.getLeetcodeLink());
            return repository.save(problem);
        }).orElseThrow(() -> new RuntimeException("Problem not found"));
    }
}
