package com.example.docweb.controller;

import com.example.docweb.dto.AppointmentDto;
import com.example.docweb.entity.Appointment;
import com.example.docweb.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping("/doctor")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByDoctorId() {
        List<Appointment> appointments = appointmentService.getAppointmentsByDoctorId();
        return new ResponseEntity<>(
                appointments.stream()
                        .map(Appointment::toDto)
                        .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/doctor/date/{date}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByDoctorIdAndDate(@PathVariable String date) {
        List<Appointment> appointments = appointmentService.getAppointmentsByDoctorIdAndDate(date);
        return new ResponseEntity<>(
                appointments.stream()
                        .map(Appointment::toDto)
                        .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/doctor/current-month")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByDoctorAndCurrentMonth() {
        List<Appointment> appointments = appointmentService.getAppointmentsDoctorCurrentMonth();
        return new ResponseEntity<>(
                appointments.stream()
                        .map(Appointment::toDto)
                        .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/doctor/month/{month}/year/{year}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByDoctorAndMonth(@PathVariable int month, @PathVariable int year) {
        List<Appointment> appointments = appointmentService.getAppointmentsDoctorByMonthAndYear(month, year);
        return new ResponseEntity<>(
                appointments.stream()
                        .map(Appointment::toDto)
                        .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/current-month/doctor/{id}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByDoctorIdAndCurrentMonth(@PathVariable long id) {
        List<Appointment> appointments = appointmentService.getAppointmentsDoctorIdCurrentMonth(id);
        return new ResponseEntity<>(
                appointments.stream()
                        .map(Appointment::toDto)
                        .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/doctor/date-from")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByDoctorIdAndDateFrom() {
        List<Appointment> appointments = appointmentService.getAppointmentsByDoctorIdAndDateFrom();
        return new ResponseEntity<>(
                appointments.stream()
                        .map(Appointment::toDto)
                        .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/doctor/current-date")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsDoctorCurrentDate() {
        List<Appointment> appointments = appointmentService.getAppointmentsByDoctorIdAndCurrentDate();
        return new ResponseEntity<>(
                appointments.stream()
                        .map(Appointment::toDto)
                        .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/patient/current-month")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByPatientIdAndCurrentMonth() {
        List<Appointment> appointments = appointmentService.getAppointmentsPatientCurrentMonth();
        return new ResponseEntity<>(
                appointments.stream()
                        .map(Appointment::toDto)
                        .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/patient/current-date")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsPatientCurrentDate() {
        List<Appointment> appointments = appointmentService.getAppointmentsByPatientIdAndCurrentDate();
        return new ResponseEntity<>(
                appointments.stream()
                        .map(Appointment::toDto)
                        .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/patient/date-from")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByPatientIdAndDateFrom() {
        List<Appointment> appointments = appointmentService.getAppointmentsByPatientIdAndDateFrom();
        return new ResponseEntity<>(
                appointments.stream()
                        .map(Appointment::toDto)
                        .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/patient")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByPatientId() {
        List<Appointment> appointments = appointmentService.getAppointmentsByPatientId();
        return new ResponseEntity<>(
                appointments.stream()
                        .map(Appointment::toDto)
                        .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDto> getAppointmentsByAppointmentId(@PathVariable long id) {
        Appointment appointment = appointmentService.getAppointmentsByAppointmentId(id);
        return new ResponseEntity<>(Appointment.toDto(appointment), HttpStatus.OK);
    }

    @Transactional
    @PostMapping
    @PreAuthorize("hasRole('ROLE_PATIENT') or hasRole('ROLE_DOCTOR')")
    public ResponseEntity<AppointmentDto> saveAppointment(@RequestBody AppointmentDto appointmentDto) {
        Appointment appointment = appointmentService.saveAppointment(AppointmentDto.toAppointment(appointmentDto));
        return new ResponseEntity<>(Appointment.toDto(appointment), HttpStatus.OK);
    }

    @Transactional
    @PostMapping("/delete")
    @PreAuthorize("hasRole('ROLE_PATIENT') or hasRole('ROLE_DOCTOR')")
    public ResponseEntity<Void> deleteAppointment(@RequestBody AppointmentDto appointmentDto) {
        appointmentService.deleteAppointmentById(appointmentDto.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
