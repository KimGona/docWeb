package com.example.docweb.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Data
@Table(name = "free_times")
public class FreeTime {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String date;

    @OneToMany(mappedBy = "freeTime", cascade = CascadeType.ALL)
    private List<Time> timeList;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;
}
