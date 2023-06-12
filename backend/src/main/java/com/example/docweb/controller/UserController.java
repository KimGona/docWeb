package com.example.docweb.controller;

import com.example.docweb.dto.DoctorDto;
import com.example.docweb.dto.PatientDto;
import com.example.docweb.dto.UserDto;
import com.example.docweb.entity.User;
import com.example.docweb.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users.stream().map(User::toDto).collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/id")
    public ResponseEntity<List<UserDto>> getRegisteredUsersByUserId() {
        List<User> users = userService.getRegisteredUsersByUserId();
        return new ResponseEntity<>(users.stream().map(User::toDto).collect(Collectors.toList()), HttpStatus.OK);
    }

    @Transactional
    @PostMapping("/admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserDto> addUserAdmin(@RequestBody UserDto userDto) {
        User user = userService.addUserAdmin(UserDto.toUser(userDto));
        return new ResponseEntity<>(User.toDto(user), HttpStatus.OK);
    }

    @Transactional
    @PostMapping("/doctor")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserDto> addUserDoctor(@RequestBody UserDto userDto) {
        User user = userService.addUserDoctor(UserDto.toUser(userDto), DoctorDto.toDoctor(userDto.getDoctor()));
        return new ResponseEntity<>(User.toDto(user), HttpStatus.OK);
    }

    @Transactional
    @PostMapping("/patient")
    @PreAuthorize("permitAll()")
    public ResponseEntity<UserDto> addUserPatient(@RequestBody UserDto userDto) {
        User user = userService.addUserPatient(UserDto.toUser(userDto), PatientDto.toPatient(userDto.getPatient()));
        return new ResponseEntity<>(User.toDto(user), HttpStatus.OK);
    }

    @GetMapping("/role")
    @PreAuthorize("permitAll()")
    public ResponseEntity<String> getRole() {
        return new ResponseEntity<>(userService.getRole(), HttpStatus.OK);
    }

    @GetMapping("/user-id")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Long> getPatientId() {
        return new ResponseEntity<>(userService.getUserId(), HttpStatus.OK);
    }
}
