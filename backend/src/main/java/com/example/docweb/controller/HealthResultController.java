package com.example.docweb.controller;

import com.example.docweb.dto.AppointmentDto;
import com.example.docweb.dto.HealthResultDto;
import com.example.docweb.entity.Appointment;
import com.example.docweb.entity.HealthResult;
import com.example.docweb.services.HealthResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/health-results")
public class HealthResultController {
    HealthResultService healthResultService;

    @Autowired
    public HealthResultController(HealthResultService healthResultService) {
        this.healthResultService = healthResultService;
    }

    @GetMapping("/patient")
    ResponseEntity<List<HealthResultDto>> getHealthResultsByPatientId() {
        List<HealthResult> healthResults = healthResultService.getHealthResultsByPatientId();
        return new ResponseEntity<>(healthResults.stream().map(HealthResult::toDto).collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/patient/current-month")
    ResponseEntity<List<HealthResultDto>> getHealthResultsByPatientIdAndCurrentMonth() {
        List<HealthResult> healthResults = healthResultService.getHealthResultsByPatientIdAndCurrentMonth();
        return new ResponseEntity<>(healthResults.stream().map(HealthResult::toDto).collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/doctor")
    ResponseEntity<List<HealthResultDto>> getHealthResultsByDoctorId() {
        List<HealthResult> healthResults = healthResultService.getHealthResultsByDoctorId();
        return new ResponseEntity<>(healthResults.stream().map(HealthResult::toDto).collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/doctor/month/{month}/year/{year}")
    ResponseEntity<List<HealthResultDto>> getHealthResultsByDoctorIdAndMonth(@PathVariable int month, @PathVariable int year) {
        List<HealthResult> healthResults = healthResultService.getHealthResultsByDoctorIdAndMonth(month, year);
        return new ResponseEntity<>(healthResults.stream().map(HealthResult::toDto).collect(Collectors.toList()), HttpStatus.OK);
    }

    @Transactional
    @PostMapping
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ResponseEntity<HealthResultDto> saveHealthResult(@RequestBody HealthResultDto healthResultDto) {
        HealthResult healthResult = healthResultService.saveHealthResult(HealthResultDto.toHealthResult(healthResultDto));
        return new ResponseEntity<>(HealthResult.toDto(healthResult), HttpStatus.OK);
    }
}
