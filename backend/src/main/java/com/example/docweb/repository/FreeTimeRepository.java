package com.example.docweb.repository;

import com.example.docweb.entity.Appointment;
import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.FreeTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface FreeTimeRepository extends JpaRepository<FreeTime,Long> {
    FreeTime findByDoctorIdAndDate(Long doctorId, Date date);
    List<FreeTime> findByDoctorId(long doctorId);

    @Query(value = "SELECT * " +
            "FROM free_times a " +
            "WHERE a.doctor_id = ?1 AND MONTH(a.date) = ?2 AND YEAR(a.date) = ?3", nativeQuery = true)
    List<FreeTime> findByDoctorIdAndMonth(Long doctorId, int month, int year);
}
