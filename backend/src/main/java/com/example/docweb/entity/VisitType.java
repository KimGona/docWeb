package com.example.docweb.entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "visit_types")
public class VisitType {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String description;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;
}
