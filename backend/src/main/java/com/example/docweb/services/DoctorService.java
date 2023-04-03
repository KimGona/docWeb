package com.example.docweb.services;

import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.VisitType;
import com.example.docweb.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorService {
    private final DoctorRepository doctorRepository;

    @Autowired
    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public Doctor getDoctorById(long id) {
        return doctorRepository.findById(id).orElse(null);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public List<Doctor> getDoctorsByNameSurnameAndSpecialty(String name, String surname, String specialty) {
        List<Doctor> allDoctors = doctorRepository.findAll();

        return allDoctors.stream()
                .filter(d -> d.getName().toLowerCase().startsWith(defaultString(name).toLowerCase()))
                .filter(d -> d.getSurname().startsWith(defaultString(surname).toLowerCase()))
                .filter(d -> d.getSpeciality().startsWith(defaultString(specialty).toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<String> getVisitTypesByDoctorId(long id) {
        Doctor doctor = doctorRepository.findById(id).orElse(null);
        if (doctor != null)
            return doctor.getVisitTypes().stream().map(VisitType::getDescription).collect(Collectors.toList());
        else
            return null;
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
