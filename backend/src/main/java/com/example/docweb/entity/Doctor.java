package com.example.docweb.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String surname;
    private String speciality;
    private String phone;
    private String gender;

    //@OneToOne(mappedBy = "user");
    //private User user;

    @OneToMany
    @JoinColumn(name = "visit_type_id")
    private List<VisitType> visitTypes;

    @OneToMany
    @JoinColumn(name="schedule_time_id")
    private List<ScheduleItem> scheduleTimes;

    @OneToMany
    @JoinColumn(name="free_time_id")
    private List<FreeTime> freeTimes;



}
