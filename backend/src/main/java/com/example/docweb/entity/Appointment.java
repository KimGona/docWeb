package com.example.docweb.entity;
import com.example.docweb.dto.AppoinmentDto;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name="Appointment")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Date date;
    private Long hour;
    private boolean hasHealthResultWritten;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "visit_type_id")
    private VisitType visitType;

    static AppoinmentDto toDto(Appointment appointment) {
        AppoinmentDto appointmentDto = new AppoinmentDto();
        appointmentDto.setId(appointment.getId());
        appointmentDto.setDate(appointmentDto.getDate());
        appointmentDto.setHour(appointment.getHour());
        appointmentDto.setHasHealthResultWritten(appointment.isHasHealthResultWritten());
        appointmentDto.setPatient(Patient.toDto(appointment.getPatient()));
        appointmentDto.setDoctor(Doctor.toDto(appointment.getDoctor()));
        appointmentDto.setVisitType(VisitType.toDto(appointment.getVisitType()));
        return appointmentDto;
    }
}
