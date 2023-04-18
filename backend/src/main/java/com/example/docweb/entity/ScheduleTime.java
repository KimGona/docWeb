package com.example.docweb.entity;
import com.example.docweb.dto.ScheduleTimeDto;
import com.example.docweb.dto.TimeDto;
import jakarta.persistence.*;
import lombok.Data;

import javax.print.Doc;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Data
@Table(name = "schedule_times")
public class ScheduleTime {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int day; // 1-7 where 1 is Monday and 7 is Sunday
    private String dayName; // "Monday"

    @OneToMany(mappedBy = "scheduleTime")
    private List<Time> timeList;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    static ScheduleTimeDto toDto(ScheduleTime scheduleTime) {
        ScheduleTimeDto scheduleTimeDto = new ScheduleTimeDto();
        scheduleTimeDto.setId(scheduleTime.getId());
        scheduleTimeDto.setDay(scheduleTime.getDay());
        scheduleTimeDto.setDayName(scheduleTime.getDayName());
        scheduleTimeDto.setTimeList(scheduleTime.getTimeList().stream().map(Time::toDto).collect(Collectors.toList()));
        return scheduleTimeDto;
    }
}
