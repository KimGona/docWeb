package com.example.docweb.repository;

import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient,Long> {
}
