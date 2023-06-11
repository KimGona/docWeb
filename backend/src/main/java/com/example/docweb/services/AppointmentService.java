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

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Locale;
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

    public List<Appointment> getAppointmentsByDoctorId() {
        Long id = userService.getUserId();
        return appointmentRepository.findByDoctorId(id);
    }

    public List<Appointment> getAppointmentsByDoctorIdAndDate(String date) {
        Long id = userService.getUserId();
        SimpleDateFormat formatter2 = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        Date date2;
        try {
            date2 = formatter2.parse(date);
        } catch (Exception exception){
            System.out.println("Date 2 failed.");
            exception.printStackTrace();
            throw new OperationFailedException();
        }
        return appointmentRepository.findByDoctorIdAndDate(id, date2);
    }

    public List<Appointment> getAppointmentsByPatientIdAndCurrentDate() {
        Long id = userService.getUserId();
        Date currentDate = new Date(System.currentTimeMillis());
        return appointmentRepository.findByPatientIdAndDate(id, currentDate);
    }

    public List<Appointment> getAppointmentsByDoctorIdAndCurrentDate() {
        Long id = userService.getUserId();
        Date currentDate = new Date(System.currentTimeMillis());
        return appointmentRepository.findByDoctorIdAndDate(id, currentDate);
    }

    public List<Appointment> getAppointmentsByPatientId() {
        Long id = userService.getUserId();
        return appointmentRepository.findByPatientId(id);
    }

    public Appointment getAppointmentsByAppointmentId(long id) {
        return appointmentRepository.findById(id).orElseThrow(ElementNotFoundException::new);
    }

    public List<Appointment> getAppointmentsByCurrentMonth() {
        Long id = userService.getUserId();
        LocalDate currentDate = LocalDate.now();
        return appointmentRepository.findByDoctorIdAndMonth(id, currentDate.getMonthValue(), currentDate.getYear());
    }

    public List<Appointment> getAppointmentsByDoctorIdAndDateFrom() {
        Date date = new Date(System.currentTimeMillis());
        Long id = userService.getUserId();
        return appointmentRepository.findByDoctorIdAndDateFrom(id, date);
    }

    public List<Appointment> getAppointmentsByPatientIdAndDateFrom() {
        Date date = new Date(System.currentTimeMillis());
        Long id = userService.getUserId();
        return appointmentRepository.findByPatientIdAndDateFrom(id, date);
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
