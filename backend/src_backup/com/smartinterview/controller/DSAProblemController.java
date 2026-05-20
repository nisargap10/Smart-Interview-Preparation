package com.smartinterview.controller;

import com.smartinterview.entity.DSAProblem;
import com.smartinterview.entity.User;
import com.smartinterview.service.DSAProblemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/problems")
@RequiredArgsConstructor
public class DSAProblemController {

    private final DSAProblemService problemService;

    @GetMapping
    public ResponseEntity<List<DSAProblem>> getUserProblems(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(problemService.getUserProblems(user.getId()));
    }

    @PostMapping
    public ResponseEntity<DSAProblem> addProblem(@RequestBody DSAProblem problem, @AuthenticationPrincipal User user) {
        problem.setUserId(user.getId());
        return ResponseEntity.ok(problemService.addProblem(problem));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DSAProblem> updateProblem(@PathVariable Long id, @RequestBody DSAProblem problem) {
        return ResponseEntity.ok(problemService.updateProblem(id, problem));
    }
}
