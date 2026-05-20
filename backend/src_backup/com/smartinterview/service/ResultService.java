package com.smartinterview.service;

import com.smartinterview.entity.Result;
import com.smartinterview.repository.ResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResultService {

    private final ResultRepository repository;

    public Result saveResult(Result result) {
        return repository.save(result);
    }

    public List<Result> getUserResults(Long userId) {
        return repository.findByUserId(userId);
    }
}
