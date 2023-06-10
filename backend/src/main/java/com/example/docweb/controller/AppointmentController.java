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

    @GetMapping("/doctor/{id}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByDoctorId(@PathVariable long id) {
        List<Appointment> appointments = appointmentService.getAppointmentsByDoctorId(id);
        return new ResponseEntity<>(
                appointments.stream()
                        .map(Appointment::toDto)
                        .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/doctor/{id}/date/{date}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByDoctorIdAndDate(@PathVariable long id, @PathVariable String date) {
        List<Appointment> appointments = appointmentService.getAppointmentsByDoctorIdAndDate(id, date);
        return new ResponseEntity<>(
                appointments.stream()
                        .map(Appointment::toDto)
                        .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByPatientId(@PathVariable long id) {
        List<Appointment> appointments = appointmentService.getAppointmentsByPatientId(id);
        return new ResponseEntity<>(
                appointments.stream()
                        .map(Appointment::toDto)
                        .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/patient-date/{id}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByPatientIdAndCurrentDate(@PathVariable long id) {
        List<Appointment> appointments = appointmentService.getAppointmentsByPatientIdAndCurrentDate(id);
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
