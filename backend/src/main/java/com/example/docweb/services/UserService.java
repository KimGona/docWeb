package com.example.docweb.services;

import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.Patient;
import com.example.docweb.entity.User;
import com.example.docweb.exception.ElementNotFoundException;
import com.example.docweb.exception.OperationFailedException;
import com.example.docweb.repository.UserRepository;
import com.example.docweb.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getRegisteredUsersByUserId(long createdById) {
        return userRepository.findByCreatedBy(createdById);
    }

    public User addUserAdmin(User user) {
        if (userRepository.existsByUsername(user.getUsername()) || (user.getId() != null && userRepository.existsById(user.getId())))
            throw new OperationFailedException();

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User addUserDoctor(User user, Doctor doctor) {
        if (userRepository.existsByUsername(user.getUsername()))
            throw new OperationFailedException();

        user.setDoctor(doctor);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User addUserPatient(User user, Patient patient) {
        if (userRepository.existsByUsername(user.getUsername()))
            throw new OperationFailedException();

        user.setPatient(patient);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public String getRole(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getAuthorities().stream().findFirst().orElseThrow().getAuthority();
    }

    public long getUserId(){
        String role = getRole();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findById(((UserDetailsImpl)authentication.getPrincipal()).getId()).orElseThrow(ElementNotFoundException::new);
        return switch (role) {
            case "ROLE_PATIENT" -> user.getPatient().getId();
            case "ROLE_DOCTOR" -> user.getDoctor().getId();
            case "ROLE_ADMIN" -> user.getId();
            default -> throw new OperationFailedException();
        };
    }
}
