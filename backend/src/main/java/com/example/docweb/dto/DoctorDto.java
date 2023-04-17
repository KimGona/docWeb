package com.example.docweb.dto;

import lombok.Data;

import java.util.List;

@Data
public class DoctorDto {
    private Long id;
    private String name;
    private String surname;
    private String speciality;
    private String phone;
    private String gender;
    private List<VisitTypeDto> visitTypes;
    private List<ScheduleTimeDto> scheduleTimes;
    private List<FreeTimeDto> freeTimes;
}
