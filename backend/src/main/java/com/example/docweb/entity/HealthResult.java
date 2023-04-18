package com.example.docweb.entity;
import com.example.docweb.dto.HealthResultDto;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "health_results")
public class HealthResult {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String dateAdded;
    private Long heartRate;
    private String bloodPressure;
    private Long bloodSugar;
    private String description;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    static HealthResultDto toDto(HealthResult healthResult) {
        HealthResultDto healthResultDto = new HealthResultDto();
        healthResultDto.setId(healthResult.getId());
        healthResultDto.setDateAdded(healthResult.getDateAdded());
        healthResultDto.setHeartRate(healthResult.getHeartRate());
        healthResultDto.setBloodPressure(healthResult.getBloodPressure());
        healthResultDto.setBloodSugar(healthResult.getBloodSugar());
        healthResultDto.setDescription(healthResult.getDescription());
        healthResultDto.setAppointment(Appointment.toDto(healthResult.getAppointment()));
        healthResultDto.setPatient(Patient.toDto(healthResult.getPatient()));
        healthResultDto.setDoctor(Doctor.toDto(healthResult.getDoctor()));
        return healthResultDto;
    }
}
