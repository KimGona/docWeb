package com.example.docweb.dto;

import com.example.docweb.entity.Time;
import lombok.Data;

@Data
public class TimeDto {
    private Long id;
    private int hour;

    static Time toTime(TimeDto timeDto) {
        Time time = new Time();
        time.setId(timeDto.getId());
        time.setHour(timeDto.getHour());
        return time;
    }
}
