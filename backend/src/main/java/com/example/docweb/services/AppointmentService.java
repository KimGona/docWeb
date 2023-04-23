package com.example.docweb.services;

import com.example.docweb.entity.Appointment;
import com.example.docweb.exception.ElementNotFoundException;
import com.example.docweb.exception.OperationFailedException;
import com.example.docweb.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    @Autowired
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

    public Appointment getAppointmentsByAppointmentId(long id) {
        return appointmentRepository.findById(id).orElseThrow(ElementNotFoundException::new);
    }

    public Appointment saveAppointment(Appointment appointment) {
        Optional<Appointment> foundAppointment = appointmentRepository.findById(appointment.getId());
        Appointment newAppointment;

        if (foundAppointment.isEmpty()) {
            newAppointment = new Appointment();
        } else {
            newAppointment = foundAppointment.get();
            newAppointment.setId(appointment.getId());
        }
        newAppointment.setDate(appointment.getDate());
        newAppointment.setHour(appointment.getHour());
        newAppointment.setHasHealthResultWritten(appointment.isHasHealthResultWritten());
        newAppointment.setPatient(appointment.getPatient());
        newAppointment.setDoctor(appointment.getDoctor());
        newAppointment.setVisitType(appointment.getVisitType());

        return appointmentRepository.save(newAppointment);
    }

    public void deleteAppointmentById(long id) {
        if(!appointmentRepository.existsById(id)){
            throw new OperationFailedException();
        }
        appointmentRepository.deleteById(id);
    }
}
