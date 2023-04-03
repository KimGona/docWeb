package com.example.docweb.services;

import com.example.docweb.entity.Appointment;
import com.example.docweb.exception.OperationFailedException;
import com.example.docweb.repository.AppointmentRepository;

import java.time.LocalDate;
import java.util.List;

public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public List<Appointment> getAppointmentsByDoctorId(long id) {
        return appointmentRepository.findByDoctorId(id);
    }

    public List<Appointment> getAppointmentsByDoctorIdAndDate(long id, String date) {
        return appointmentRepository.findByDoctorIdAndDate(id, date);
    }

    public List<Appointment> getAppointmentsByPatientIdAndCurrentDate(long id) {
        String currentDate = LocalDate.now().toString();
        return appointmentRepository.findByPatientIdAndDate(id, currentDate);
    }

    public List<Appointment> getAppointmentsByPatientId(long id) {
        return appointmentRepository.findByPatientId(id);
    }

    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public void deleteAppointmentById(long id) {
        if(!appointmentRepository.existsById(id)){
            throw new OperationFailedException();
        }
        appointmentRepository.deleteById(id);
    }
}
