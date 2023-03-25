package com.example.docweb.repository;

import com.example.docweb.entity.HealthResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HealthResultRepository extends JpaRepository<HealthResult,Long> {
    List<HealthResult> findByPatientId(Long patientId);
    List<HealthResult> findByDoctorId(Long doctorId);
}
