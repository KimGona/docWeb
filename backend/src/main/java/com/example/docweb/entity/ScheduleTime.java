package com.example.docweb.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.print.Doc;
import java.util.List;

@Entity
@Getter
@Setter
@Data
@Table(name = "schedule_times")
public class ScheduleTime {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int day; // 1-7 where 1 is Monday and 7 is Sunday
    private String day_name; // "Monday"

    @OneToMany(mappedBy = "scheduleTime")
    private List<Time> timeList;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;
}
