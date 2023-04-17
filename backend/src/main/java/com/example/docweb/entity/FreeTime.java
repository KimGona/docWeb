package com.example.docweb.entity;
import com.example.docweb.dto.FreeTimeDto;
import com.example.docweb.dto.TimeDto;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Data
@Table(name = "free_times")
public class FreeTime {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Date date;

    @OneToMany(mappedBy = "freeTime", cascade = CascadeType.ALL)
    private List<Time> timeList;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    static FreeTimeDto toDto(FreeTime freeTime) {
        FreeTimeDto freeTimeDto = new FreeTimeDto();
        freeTimeDto.setId(freeTime.getId());
        freeTimeDto.setDate(freeTime.getDate());
        freeTimeDto.setTimeList(freeTime.getTimeList().stream().map(Time::toDto).collect(Collectors.toList()));
        return freeTimeDto;
    }
}
