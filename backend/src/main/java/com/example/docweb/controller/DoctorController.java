package com.example.docweb.controller;

import com.example.docweb.dto.DoctorDto;
import com.example.docweb.dto.VisitTypeDto;
import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.VisitType;
import com.example.docweb.services.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.print.Doc;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/doctors")
public class DoctorController {
    private final DoctorService doctorService;

    @Autowired
    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping
    public ResponseEntity<List<DoctorDto>> getAllDoctors() {
        List<Doctor> doctors = doctorService.getAllDoctors();
        return new ResponseEntity<>(doctors.stream().map(Doctor::toDto).collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/id")
    public ResponseEntity<DoctorDto> getDoctorById() {
        Doctor doctor = doctorService.getDoctorById();
        return new ResponseEntity<>(Doctor.toDto(doctor), HttpStatus.OK);
    }

    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<DoctorDto>> getDoctorsByNameSurnameAndSpecialty(
            @RequestParam String name,
            @RequestParam String surname,
            @RequestParam String specialty
    ) {
        List<Doctor> doctors = doctorService.getDoctorsByNameSurnameAndSpecialty(name, surname, specialty);
        return new ResponseEntity<>(doctors.stream().map(Doctor::toDto).collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/name-surname")
    @ResponseBody
    public ResponseEntity<List<DoctorDto>> getDoctorsByNameAndSurname(
            @RequestParam String name,
            @RequestParam(required = false) String surname
    ) {
        List<Doctor> doctors = doctorService.getDoctorsByNameAndSurname(name, surname);
        return new ResponseEntity<>(doctors.stream().map(Doctor::toDto).collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/specialty")
    @ResponseBody
    public ResponseEntity<List<DoctorDto>> getDoctorsBySpecialty(@RequestParam String specialty) {
        List<Doctor> doctors = doctorService.getDoctorsBySpecialty(specialty);
        return new ResponseEntity<>(doctors.stream().map(Doctor::toDto).collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/visit-types/{id}")
    public ResponseEntity<List<VisitTypeDto>> getVisitTypesByDoctorId(@PathVariable long id) {
        List<VisitType> visitTypes = doctorService.getVisitTypesByDoctorId(id);
        return new ResponseEntity<>(visitTypes.stream().map(VisitType::toDto).collect(Collectors.toList()), HttpStatus.OK);
    }

    @PostMapping("/visit-types")
    public ResponseEntity<List<VisitTypeDto>> getVisitTypesByDoctorId(@RequestBody List<VisitTypeDto> visitTypes) {
        Doctor doctor = doctorService.updateVisitTypes(visitTypes.stream().map(VisitTypeDto::toVisitType).collect(Collectors.toList()));
        return new ResponseEntity<>(visitTypes, HttpStatus.OK);
    }

    @Transactional
    @PostMapping("/delete/visit-type")
    @PreAuthorize("hasRole('ROLE_DOCTOR') or hasRole('ROLE_DOCTOR')")
    public ResponseEntity<Void> deleteVisitType(@RequestBody VisitTypeDto visitTypeDto) {
        doctorService.deleteVisitType(visitTypeDto.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
