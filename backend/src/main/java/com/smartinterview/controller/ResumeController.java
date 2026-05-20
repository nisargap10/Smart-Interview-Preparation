package com.smartinterview.controller;

import com.smartinterview.entity.Resume;
import com.smartinterview.entity.User;
import com.smartinterview.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/upload")
    public ResponseEntity<Resume> uploadResume(@RequestParam("file") MultipartFile file, @AuthenticationPrincipal User user) {
        // In a real application, save the file to cloud storage or filesystem
        Resume resume = Resume.builder()
                .userId(user.getId())
                .fileName(file.getOriginalFilename())
                .build();
        return ResponseEntity.ok(resumeService.analyzeResume(resume));
    }

    @GetMapping("/analyze")
    public ResponseEntity<List<Resume>> getUserResumes(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(resumeService.getUserResumes(user.getId()));
    }
}
