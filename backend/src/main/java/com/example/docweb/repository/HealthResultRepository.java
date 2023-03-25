package com.example.docweb.repository;

import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.HealthResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HealthResultRepository extends JpaRepository<HealthResult,Long> {
}
