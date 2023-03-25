package com.example.docweb.entity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class FreeTime {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String date;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "time_id")
    private List<Time> timeList;
}
