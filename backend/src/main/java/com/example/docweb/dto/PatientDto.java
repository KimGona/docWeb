package com.example.docweb.dto;


import com.example.docweb.entity.Patient;
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
}
