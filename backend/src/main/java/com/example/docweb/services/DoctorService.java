package com.example.docweb.services;

import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.FreeTime;
import com.example.docweb.entity.VisitType;
import com.example.docweb.exception.OperationFailedException;
import com.example.docweb.repository.DoctorRepository;
import com.example.docweb.repository.VisitTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class DoctorService {
    private final DoctorRepository doctorRepository;
    private final VisitTypeRepository visitTypeRepository;
    private final UserService userService;

    @Autowired
    public DoctorService(DoctorRepository doctorRepository, VisitTypeRepository visitTypeRepository, UserService userService) {
        this.doctorRepository = doctorRepository;
        this.visitTypeRepository = visitTypeRepository;
        this.userService = userService;
    }

    public Doctor getDoctorById() {
        long id = userService.getUserId();
        return doctorRepository.findById(id).orElse(null);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public List<Doctor> getDoctorsByNameSurnameAndSpecialty(String name, String surname, String specialty) {
        List<Doctor> allDoctors = doctorRepository.findAll();

        return allDoctors.stream()
                .filter(d -> d.getName().toLowerCase().startsWith(name.toLowerCase()))
                .filter(d -> d.getSurname().toLowerCase().startsWith(surname.toLowerCase()))
                .filter(d -> d.getSpeciality().toLowerCase().startsWith(specialty.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Doctor> getDoctorsByNameAndSurname(String name, String surname) {
        List<Doctor> allDoctors = doctorRepository.findAll();

        if (surname == null || surname.isBlank()) {
            return allDoctors.stream()
                    .filter(d -> {
                        System.out.println(d.getName());
                        return d.getName().toLowerCase().startsWith(name.toLowerCase())
                                || d.getSurname().toLowerCase().startsWith(name.toLowerCase());
                    })
                    .collect(Collectors.toList());
        }
        return allDoctors.stream()
                .filter(d -> d.getName().toLowerCase().startsWith(name.toLowerCase()))
                .filter(d -> d.getSurname().toLowerCase().startsWith(surname.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Doctor> getDoctorsBySpecialty(String specialty) {
        List<Doctor> allDoctors = doctorRepository.findAll();

        return allDoctors.stream()
                .filter(d -> d.getSpeciality().toLowerCase().startsWith(specialty.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<VisitType> getVisitTypesByDoctorId(long id) {
        Doctor doctor = doctorRepository.findById(id).orElse(null);
        if (doctor != null)
            return doctor.getVisitTypes();
        else
            return null;
    }

    public Doctor updateVisitTypes(List<VisitType> visitTypes) {
        Doctor doctor = getDoctorById();
        if (doctor == null) throw new OperationFailedException();

//        List<VisitType> result = new ArrayList<>();
//        for (VisitType visitType : visitTypes) {
//            VisitType v2 = visitTypeRepository.findByDescription(visitType.getDescription());
//            result.add(v2);
//        }
        doctor.setVisitTypes(visitTypes);
        return doctorRepository.save(doctor);
    }

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    private String defaultString(String s) {
        if (s == null)
            return "";
        else return s;
    }
}
