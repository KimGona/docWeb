package com.example.docweb.Dto;


import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.Patient;
import com.example.docweb.entity.User;
import com.example.docweb.security.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private int rownum;
    private Long id;
    private String username;
    private String password;
    private Role role;
    private User createdBy;
    private Patient patient;
    private Doctor doctor;
}
