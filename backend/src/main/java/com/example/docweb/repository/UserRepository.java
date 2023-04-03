package com.example.docweb.repository;

import com.example.docweb.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    List<User> findByCreatedBy(long id);
    boolean existsByUsername(String username);
}
