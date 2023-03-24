package com.example.docweb.entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class VisitType {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String description;


}
