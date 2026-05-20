package com.smartinterview.repository;

import com.smartinterview.entity.DSAProblem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DSAProblemRepository extends JpaRepository<DSAProblem, Long> {
    List<DSAProblem> findByUserId(Long userId);
}
