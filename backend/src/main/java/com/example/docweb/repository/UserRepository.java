package com.example.docweb.repository;

import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
