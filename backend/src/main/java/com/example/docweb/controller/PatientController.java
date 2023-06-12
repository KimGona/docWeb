package com.example.docweb.controller;

import com.example.docweb.dto.PatientDto;
import com.example.docweb.entity.Patient;
import com.example.docweb.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/patient")
public class PatientController {
    private final PatientService patientService;

    @Autowired
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping("/id")
    public ResponseEntity<PatientDto> getPatientById() {
        Patient patient = patientService.getPatientById();
        return new ResponseEntity<>(Patient.toDto(patient), HttpStatus.OK);
    }
}
