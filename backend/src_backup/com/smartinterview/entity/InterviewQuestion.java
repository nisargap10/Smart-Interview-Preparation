package com.smartinterview.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "interview_questions")
public class InterviewQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category; // Java, DBMS, OS, CN, HR
    private String difficulty;
    
    @Column(columnDefinition = "TEXT")
    private String question;
    
    @Column(columnDefinition = "TEXT")
    private String answer;
}
