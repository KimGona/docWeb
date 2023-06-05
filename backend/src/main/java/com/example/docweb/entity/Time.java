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
    @Column(unique = true)
    private int hour;

    static TimeDto toDto(Time time) {
        TimeDto timeDto = new TimeDto();
        timeDto.setId(time.getId());
        timeDto.setHour(time.getHour());
        return timeDto;
    }
}
