package com.example.docweb.entity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String surname;
    private Date dateOfBirth;
    @Embedded
    private Address address;
    private String gender;
}
