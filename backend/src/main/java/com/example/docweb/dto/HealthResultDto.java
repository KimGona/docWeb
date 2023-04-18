package com.example.docweb.dto;
import lombok.Data;

@Data
public class HealthResultDto {
    private Long id;
    private String dateAdded;
    private Long heartRate;
    private String bloodPressure;
    private Long bloodSugar;
    private String description;
    private AppointmentDto appointment;
    private PatientDto patient;
    private DoctorDto doctor;
}

