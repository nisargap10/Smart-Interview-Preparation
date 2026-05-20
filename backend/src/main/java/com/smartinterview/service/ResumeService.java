package com.smartinterview.service;

import com.smartinterview.entity.Resume;
import com.smartinterview.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ResumeRepository repository;

    public Resume analyzeResume(Resume resume) {
        // Mocking ATS score calculation logic
        int score = (int) (Math.random() * 40) + 60; // 60 to 100
        resume.setAtsScore(score);
        return repository.save(resume);
    }

    public List<Resume> getUserResumes(Long userId) {
        return repository.findByUserId(userId);
    }
}
