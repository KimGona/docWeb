package com.example.docweb.dto;
import com.example.docweb.entity.HealthResult;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class HealthResultDto {
    private Long id;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateAdded;
    private Long heartRate;
    private String bloodPressure;
    private Long bloodSugar;
    private String description;
    private AppointmentDto appointment;
    private PatientDto patient;
    private DoctorDto doctor;

    public static HealthResult toHealthResult(HealthResultDto healthResultDto) {
        HealthResult healthResult = new HealthResult();
        healthResult.setId(healthResultDto.getId());
        if (healthResultDto.getDateAdded() != null)
            healthResult.setDateAdded(healthResultDto.getDateAdded());
        healthResult.setHeartRate(healthResultDto.getHeartRate());
        healthResult.setBloodPressure(healthResultDto.getBloodPressure());
        healthResult.setBloodSugar(healthResultDto.getBloodSugar());
        healthResult.setDescription(healthResultDto.getDescription());
        healthResult.setAppointment(AppointmentDto.toAppointment(healthResultDto.getAppointment()));
        if (healthResultDto.getPatient() != null)
            healthResult.setPatient(PatientDto.toPatient(healthResultDto.getPatient()));
        if (healthResultDto.getDoctor() != null)
            healthResult.setDoctor(DoctorDto.toDoctor(healthResultDto.getDoctor()));
        return healthResult;
    }
}

