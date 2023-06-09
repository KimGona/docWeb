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

    @ManyToMany
    @JoinTable(
            name = "schedule_time_time",
            joinColumns = @JoinColumn(name = "schedule_time_id"),
            inverseJoinColumns = @JoinColumn(name = "time_id")
    )
    private List<Time> timeList;

    @ManyToOne
    private Doctor doctor;

    public static ScheduleTimeDto toDto(ScheduleTime scheduleTime) {
        ScheduleTimeDto scheduleTimeDto = new ScheduleTimeDto();
        scheduleTimeDto.setId(scheduleTime.getId());
        scheduleTimeDto.setDay(scheduleTime.getDay());
        scheduleTimeDto.setDayName(scheduleTime.getDayName());
        scheduleTimeDto.setTimeList(scheduleTime.getTimeList().stream().map(Time::toDto).collect(Collectors.toList()));
        scheduleTimeDto.setDoctor(Doctor.toDto(scheduleTime.getDoctor()));
        return scheduleTimeDto;
    }
}
