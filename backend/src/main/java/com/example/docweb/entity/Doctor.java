package com.example.docweb.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Data
@Table(name = "doctors")
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

    @OneToMany(mappedBy = "doctor")
    private List<VisitType> visitTypes;

    @OneToMany(mappedBy = "doctor")
    private List<ScheduleTime> scheduleTimes;

    @OneToMany(mappedBy = "doctor")
    private List<FreeTime> freeTimes;
}
