package com.example.docweb.controller;

import com.example.docweb.dto.DoctorDto;
import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.VisitType;
import com.example.docweb.services.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

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

    @GetMapping("/{id}")
    public ResponseEntity<DoctorDto> getDoctorById(@PathVariable long id) {
        Doctor doctor = doctorService.getDoctorById(id);
        return new ResponseEntity<>(Doctor.toDto(doctor), HttpStatus.OK);
    }

    @GetMapping("/name/{name}/surname/{surname}/specialty/{specialty}")
    public ResponseEntity<List<DoctorDto>> getDoctorsByNameSurnameAndSpecialty(
            @PathVariable String name,
            @PathVariable String surname,
            @PathVariable String specialty
    ) {
        List<Doctor> doctors = doctorService.getDoctorsByNameSurnameAndSpecialty(name, surname, specialty);
        return new ResponseEntity<>(doctors.stream().map(Doctor::toDto).collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("visit-types/{id}")
    public ResponseEntity<List<String>> getVisitTypesByDoctorId(@PathVariable long id) {
        List<String> visitTypes = doctorService.getVisitTypesByDoctorId(id);
        return new ResponseEntity<>(visitTypes, HttpStatus.OK);
    }

}
