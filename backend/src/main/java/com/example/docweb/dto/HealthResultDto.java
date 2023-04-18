package com.example.docweb.dto;
import com.example.docweb.entity.HealthResult;
import lombok.Data;

@Data
public class HealthResultDto {
    private Long id;
    private String dateAdded;
    private Long heartRate;
    private String bloodPressure;
    private Long bloodSugar;
    private String description;
    private AppoinmentDto appointment;
    private PatientDto patient;
    private DoctorDto doctor;

//    static HealthResult toHealthResult(HealthResultDto healthResultDto) {
//        HealthResult healthResult = new HealthResult();
//        healthResult.setDateAdded(healthResultDto.getDateAdded());
//        healthResult.setHeartRate(healthResultDto.getHeartRate());
//        healthResult.setBloodPressure(healthResultDto.getBloodPressure());
//        healthResult.setBloodSugar(healthResultDto.getBloodSugar());
//        healthResult.setDescription(healthResultDto.getDescription());
//        healthResult.setAppointment(healthResultDto.getAppointment());
//    }
}

