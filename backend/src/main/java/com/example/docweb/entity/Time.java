package com.example.docweb.entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data

public class Time {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int hour;
}
