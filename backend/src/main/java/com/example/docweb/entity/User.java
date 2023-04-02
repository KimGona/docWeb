package com.example.docweb.entity;
import com.example.docweb.security.Role;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String username;
    private String password;
    private Role role;

    @ManyToOne
    @JoinColumn(name = "admin_id", insertable=false, updatable=false)
    private Admin createdBy;  // admin id

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="admin_id")
    private Admin admin;
}
