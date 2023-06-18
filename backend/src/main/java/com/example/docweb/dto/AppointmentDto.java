package com.example.docweb.dto;


import com.example.docweb.entity.Appointment;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class AppointmentDto {
    private Long id;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private int hour;
    private boolean hasHealthResultWritten;
    private PatientDto patient;
    private DoctorDto doctor;
    private VisitTypeDto visitType;

    public static Appointment toAppointment(AppointmentDto appointmentDto) {
        Appointment appointment = new Appointment();
        appointment.setId(appointmentDto.getId());
        appointment.setDate(appointmentDto.getDate());
        appointment.setHour(appointmentDto.getHour());
        appointment.setHasHealthResultWritten(appointmentDto.isHasHealthResultWritten());
        if (appointmentDto.getPatient() != null)
            appointment.setPatient(PatientDto.toPatient(appointmentDto.getPatient()));
        if (appointmentDto.getDoctor() != null)
            appointment.setDoctor(DoctorDto.toDoctor(appointmentDto.getDoctor()));
        appointment.setVisitType(VisitTypeDto.toVisitType(appointmentDto.getVisitType()));
        return appointment;
    }
}
