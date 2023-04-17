package com.example.docweb.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class AppoinmentDto {
    private Long id;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private Long hour;
    private boolean hasHealthResultWritten;
    private PatientDto patient;
    private DoctorDto doctor;
    private VisitTypeDto visitType;
}
