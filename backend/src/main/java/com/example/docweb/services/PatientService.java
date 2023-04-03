package com.example.docweb.services;

import com.example.docweb.entity.Patient;
import com.example.docweb.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientService {
    private final PatientRepository patientRepository;

    @Autowired
    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public Patient getPatientById(long id) {
        return patientRepository.findById(id).orElse(null);
    }
}
