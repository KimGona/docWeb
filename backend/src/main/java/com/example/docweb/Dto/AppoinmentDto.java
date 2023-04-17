package com.example.docweb.Dto;


import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.Patient;
import com.example.docweb.entity.VisitType;
import lombok.*;

import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AppoinmentDto {
    private Long id;
    private Date date;
    private Long hour;
    private boolean hasHealthResultWritten;
    private Patient patient;
    private Doctor doctor;
    private VisitType visitType;
}
