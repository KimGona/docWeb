package com.example.docweb.repository;

import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.FreeTime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FreeTimeRepository extends JpaRepository<FreeTime,Long> {
    List<FreeTime> findByDoctorIdAndDate(Long doctorId, String date);
}
