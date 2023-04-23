package com.example.docweb.repository;

import com.example.docweb.entity.ScheduleTime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleTimeRepository extends JpaRepository<ScheduleTime,Long> {
    // TODO: Check if should return Optional<ScheduleTime>
    ScheduleTime findByDoctorIdAndDay(Long doctorId, int day);
    List<ScheduleTime> findByDoctorId(Long doctorId);
}
