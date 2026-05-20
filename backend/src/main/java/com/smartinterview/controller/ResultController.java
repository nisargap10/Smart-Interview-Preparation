package com.smartinterview.controller;

import com.smartinterview.entity.Result;
import com.smartinterview.entity.User;
import com.smartinterview.service.ResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;

    @PostMapping
    public ResponseEntity<Result> saveResult(@RequestBody Result result, @AuthenticationPrincipal User user) {
        result.setUserId(user.getId());
        return ResponseEntity.ok(resultService.saveResult(result));
    }

    @GetMapping
    public ResponseEntity<List<Result>> getUserResults(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(resultService.getUserResults(user.getId()));
    }
}
