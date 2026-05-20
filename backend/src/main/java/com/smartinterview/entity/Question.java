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
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String title;

    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctAnswer;

    private String category;
    private String difficulty;

    @Column(columnDefinition = "TEXT")
    private String explanation;
}
