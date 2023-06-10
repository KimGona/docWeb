package com.example.docweb.services;

import com.example.docweb.entity.Appointment;
import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.Patient;
import com.example.docweb.exception.ElementNotFoundException;
import com.example.docweb.exception.OperationFailedException;
import com.example.docweb.repository.AppointmentRepository;
import com.example.docweb.repository.DoctorRepository;
import com.example.docweb.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final UserService userService;

    @Autowired
    public AppointmentService(
            AppointmentRepository appointmentRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository,
            UserService userService
    ) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.userService = userService;
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
        Optional<Appointment> foundAppointment = Optional.empty();
        if (appointment.getId() != null)
            foundAppointment = appointmentRepository.findById(appointment.getId());
        Appointment newAppointment;

        Long patientId = userService.getUserId();
        Patient patient = patientRepository.findById(patientId).orElseThrow(OperationFailedException::new);
        Doctor doctor = doctorRepository.findById(appointment.getDoctor().getId()).orElse(null);

        if (foundAppointment.isEmpty()) {
            newAppointment = new Appointment();
        } else {
            newAppointment = foundAppointment.get();
        }
        newAppointment.setDate(appointment.getDate());
        newAppointment.setHour(appointment.getHour());
        newAppointment.setHasHealthResultWritten(appointment.isHasHealthResultWritten());
        newAppointment.setPatient(patient);
        newAppointment.setDoctor(doctor);
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
