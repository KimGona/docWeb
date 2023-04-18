package com.example.docweb.dto;

import com.example.docweb.entity.ScheduleTime;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class ScheduleTimeDto {
    private Long id;
    private int day;
    private String dayName;
    private List<TimeDto> timeList;

    static ScheduleTime toScheduleTime(ScheduleTimeDto scheduleTimeDto) {
        ScheduleTime scheduleTime = new ScheduleTime();
        scheduleTime.setId(scheduleTimeDto.getId());
        scheduleTime.setDay(scheduleTimeDto.getDay());
        scheduleTime.setDayName(scheduleTimeDto.getDayName());
        scheduleTime.setTimeList(scheduleTimeDto.getTimeList().stream().map(TimeDto::toTime).collect(Collectors.toList()));
        return scheduleTime;
    }
}
