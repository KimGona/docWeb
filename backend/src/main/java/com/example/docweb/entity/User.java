package com.example.docweb.entity;
import com.example.docweb.dto.DoctorDto;
import com.example.docweb.dto.PatientDto;
import com.example.docweb.dto.UserDto;
import com.example.docweb.security.Role;
import com.example.docweb.security.UserDetailsImpl;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String username;
    private String password;
    private Role role;
    private Long createdBy;

//    @ManyToOne
//    @JoinColumn(name = "user_id", insertable=false, updatable=false)
//    private User createdBy;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    public static UserDto toDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(userDto.getId());
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setRole(user.getRole());
        userDto.setCreatedBy(user.getCreatedBy());
        userDto.setPatient(Patient.toDto(user.getPatient()));
        userDto.setDoctor(Doctor.toDto(user.getDoctor()));
        return userDto;
    }
}
