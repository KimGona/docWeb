package com.example.docweb.repository;

import com.example.docweb.entity.ScheduleTime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleItemRepository extends JpaRepository<ScheduleTime,Long> {
}
