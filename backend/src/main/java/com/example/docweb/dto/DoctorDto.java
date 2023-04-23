package com.example.docweb.dto;

import com.example.docweb.entity.Doctor;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class DoctorDto {
    private Long id;
    private String name;
    private String surname;
    private String speciality;
    private String phone;
    private String gender;
    private List<VisitTypeDto> visitTypes;

    public static Doctor toDoctor(DoctorDto doctorDto) {
        Doctor doctor = new Doctor();
        doctor.setId(doctorDto.getId());
        doctor.setName(doctorDto.getName());
        doctor.setSurname(doctorDto.getSurname());
        doctor.setSpeciality(doctorDto.getSpeciality());
        doctor.setVisitTypes(doctorDto.getVisitTypes().stream().map(VisitTypeDto::toVisitType).collect(Collectors.toList()));
        return doctor;
    }
}
