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
@Table(name = "dsa_problems")
public class DSAProblem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // For user specific tracking
    
    private String title;
    private String difficulty; // Easy, Medium, Hard
    private String topic; // Array, String, LinkedList, etc.
    
    private boolean solved;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
}
