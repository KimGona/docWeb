package com.example.docweb.repository;

import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.ScheduleItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleItemRepository extends JpaRepository<ScheduleItem,Long> {
}
