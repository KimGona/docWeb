package com.example.docweb.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //@OneToOne(mappedBy = "user");
    //private User user;
}
