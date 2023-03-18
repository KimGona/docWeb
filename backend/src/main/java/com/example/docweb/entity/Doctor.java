package com.example.docweb.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data

public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String surname;
    private String speciality;
    private String phone;
    private String gender;

    //@OneToOne(cascade = CascadeType.ALL);
    //@JoinColumn(name = "user_id")
    //private User user;
    //List<ScheduleItem> schedule_item;
    //List<ScheduleTime_id> schedule_time_id;
    //List<Free_time_id> free_time_id;


}
