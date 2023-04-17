package com.example.docweb.entity;
import com.example.docweb.dto.TimeDto;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "times")
public class Time {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int hour;

    @ManyToOne
    @JoinColumn(name = "free_time_id")
    private FreeTime freeTime;

    @ManyToOne
    @JoinColumn(name = "schedule_time_id")
    private ScheduleTime scheduleTime;

    static TimeDto toDto(Time time) {
        TimeDto timeDto = new TimeDto();
        timeDto.setId(time.getId());
        timeDto.setHour(time.getHour());
        return timeDto;
    }
}
