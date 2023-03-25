package com.example.docweb.repository;

import com.example.docweb.entity.ScheduleTime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleItemRepository extends JpaRepository<ScheduleTime,Long> {
    List<ScheduleTime> findByDoctorIdAndDay(Long doctorId, int day);
}
