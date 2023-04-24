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
    private AppointmentDto appointment;
    private PatientDto patient;
    private DoctorDto doctor;

    public static HealthResult toHealthResult(HealthResultDto healthResultDto) {
        HealthResult healthResult = new HealthResult();
        healthResult.setId(healthResultDto.getId());
        healthResult.setDateAdded(healthResult.getDateAdded());
        healthResult.setHeartRate(healthResultDto.getHeartRate());
        healthResult.setBloodPressure(healthResultDto.getBloodPressure());
        healthResult.setBloodSugar(healthResultDto.getBloodSugar());
        healthResult.setDescription(healthResultDto.getDescription());
        healthResult.setAppointment(AppointmentDto.toAppointment(healthResultDto.getAppointment()));
        healthResult.setPatient(PatientDto.toPatient(healthResultDto.getPatient()));
        healthResult.setDoctor(DoctorDto.toDoctor(healthResultDto.getDoctor()));
        return healthResult;
    }
}

