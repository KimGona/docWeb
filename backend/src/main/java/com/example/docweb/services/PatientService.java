package com.example.docweb.services;

import com.example.docweb.entity.Patient;
import com.example.docweb.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientService {
    private final PatientRepository patientRepository;
    private final UserService userService;

    @Autowired
    public PatientService(PatientRepository patientRepository, UserService userService) {
        this.patientRepository = patientRepository;
        this.userService = userService;
    }

    public Patient getPatientById() {
        long id = userService.getUserId();
        return patientRepository.findById(id).orElse(null);
    }
}
