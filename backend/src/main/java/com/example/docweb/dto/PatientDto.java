package com.example.docweb.dto;


import com.example.docweb.entity.Address;
import com.example.docweb.entity.Patient;
import com.example.docweb.entity.Time;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class PatientDto {
    private Long id;
    private String name;
    private String surname;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateOfBirth;
    private AddressDto address;
    private String gender;

    public static Patient toPatient(PatientDto patientDto) {
        Patient patient = new Patient();
        patient.setId(patientDto.getId());
        patient.setName(patientDto.getName());
        patient.setSurname(patientDto.getSurname());
        patient.setDateOfBirth(patientDto.getDateOfBirth());
        patient.setAddress(AddressDto.toAddress(patientDto.getAddress()));
        patient.setGender(patientDto.getGender());
        return patient;
    }
}
