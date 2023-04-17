package com.example.docweb.Dto;

import com.example.docweb.entity.FreeTime;
import com.example.docweb.entity.ScheduleTime;
import com.example.docweb.entity.VisitType;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class DoctorDto {

    private int rownum;
    private Long id;
    private String name;
    private String surname;
    private String speciality;
    private String phone;
    private String gender;
    private List<VisitType> visitTypes;
    private List<ScheduleTime> scheduleTimes;
    private List<FreeTime> freeTimes;
}
