package com.example.docweb.dto;

import com.example.docweb.entity.User;
import com.example.docweb.security.Role;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String password;
    private Role role;
    private Long createdBy;
    private PatientDto patient;
    private DoctorDto doctor;

    public static User toUser(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        user.setRole(userDto.getRole());
        user.setCreatedBy(userDto.getCreatedBy());
        user.setPatient(PatientDto.toPatient(userDto.getPatient()));
        user.setDoctor(DoctorDto.toDoctor(userDto.getDoctor()));
        return user;
    }
}
