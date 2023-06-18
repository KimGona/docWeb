package com.example.docweb.repository;

import com.example.docweb.entity.Appointment;
import com.example.docweb.entity.ScheduleTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ScheduleTimeRepository extends JpaRepository<ScheduleTime,Long> {
    Optional<ScheduleTime> findByDoctorIdAndDay(Long doctorId, int day);
    List<ScheduleTime> findByDoctorId(Long doctorId);
}
