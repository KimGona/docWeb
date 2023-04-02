package com.example.docweb.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Data
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String surname;
    private String dateOfBirth;
    private String street;
    private String city;
    private Long streetNumber;
    private String gender;

    //@OneToOne(mappedBy = "user")
    //private User user;
}
