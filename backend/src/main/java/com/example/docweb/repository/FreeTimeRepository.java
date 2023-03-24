package com.example.docweb.repository;

import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.FreeTime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FreeTimeRepository extends JpaRepository<FreeTime,Long> {
}
