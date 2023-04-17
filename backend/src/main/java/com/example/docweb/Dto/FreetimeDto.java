package com.example.docweb.Dto;


import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.Time;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class FreetimeDto {
    private int rownum;
    private Long id;
    private Date date;
    private List<Time> timeList;
    private Doctor doctor;
}
