package com.example.docweb.entity;
import com.example.docweb.dto.HealthResultDto;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "health_results")
public class HealthResult {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Date dateAdded;
    private Long heartRate;
    private String bloodPressure;
    private Long bloodSugar;
    private String description;

    @OneToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

    @OneToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @OneToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    public static HealthResultDto toDto(HealthResult healthResult) {
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
