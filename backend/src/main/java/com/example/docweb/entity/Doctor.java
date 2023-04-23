package com.example.docweb.entity;

import com.example.docweb.dto.DoctorDto;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Entity
@Data
@Table(name = "doctors")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String surname;
    private String speciality;
    private String phone;
    private String gender;

    @OneToMany
    private List<VisitType> visitTypes;

    public static DoctorDto toDto(Doctor doctor) {
        DoctorDto doctorDto = new DoctorDto();
        doctorDto.setId(doctor.getId());
        doctorDto.setName(doctor.getName());
        doctorDto.setSurname(doctor.getSurname());
        doctorDto.setSpeciality(doctor.getSpeciality());
        doctorDto.setPhone(doctor.getPhone());
        doctorDto.setGender(doctor.getGender());
        doctorDto.setVisitTypes(doctor.getVisitTypes().stream().map(VisitType::toDto).collect(Collectors.toList()));
        return doctorDto;
    }
}
