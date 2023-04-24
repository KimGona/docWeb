package com.example.docweb.repository;

import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.FreeTime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface FreeTimeRepository extends JpaRepository<FreeTime,Long> {
    FreeTime findByDoctorIdAndDate(Long doctorId, Date date);
    List<FreeTime> findByDoctorId(long doctorId);
}
