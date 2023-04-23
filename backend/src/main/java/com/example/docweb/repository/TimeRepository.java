package com.example.docweb.repository;

import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.Time;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimeRepository extends JpaRepository<Time,Long> {
    Boolean existsByHour(int hour);
}
