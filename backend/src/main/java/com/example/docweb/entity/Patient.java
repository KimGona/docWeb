package com.example.docweb.entity;
import com.example.docweb.dto.PatientDto;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Table(name = "Patient")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String surname;
    private Date dateOfBirth;

    @Embedded
    private Address address;
    private String gender;

    static PatientDto toDto(Patient patient) {
        PatientDto patientDto = new PatientDto();
        patientDto.setId(patient.getId());
        patientDto.setName(patient.getName());
        patientDto.setSurname(patient.getSurname());
        patientDto.setDateOfBirth(patient.getDateOfBirth());
        patientDto.setAddress(Address.toDto(patient.getAddress()));
        patientDto.setGender(patient.getGender());
        return patientDto;
    }
}
