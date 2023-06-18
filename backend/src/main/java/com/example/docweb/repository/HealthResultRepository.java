package com.example.docweb.repository;

import com.example.docweb.entity.Appointment;
import com.example.docweb.entity.HealthResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HealthResultRepository extends JpaRepository<HealthResult,Long> {
    List<HealthResult> findByPatientId(Long patientId);
    List<HealthResult> findByDoctorId(Long doctorId);
    @Query(value = "SELECT * " +
            "FROM health_results a " +
            "WHERE a.patient_id = ?1 AND MONTH(a.date_added) = ?2 AND YEAR(a.date_added) = ?3", nativeQuery = true)
    List<HealthResult> findByPatientIdAndMonth(Long patientId, int month, int year);
}
