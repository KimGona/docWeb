package com.example.docweb.Dto;


import com.example.docweb.entity.Doctor;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VisitTypeDto {
    private int rownum;
    private Long id;
    private String description;
    private Doctor doctor;
}
