package com.example.docweb.entity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data

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
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;


}
