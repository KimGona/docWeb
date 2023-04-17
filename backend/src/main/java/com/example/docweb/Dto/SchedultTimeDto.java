package com.example.docweb.Dto;


import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.Time;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SchedultTimeDto {
    private int rownum;
    private Long id;
    private int day;
    private String day_name;
    private List<Time> timeList;
    private Doctor doctor;

}
