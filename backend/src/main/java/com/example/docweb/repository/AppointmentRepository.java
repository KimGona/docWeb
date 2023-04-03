package com.example.docweb.repository;

import com.example.docweb.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
    List<Appointment> findByPatientId(Long patientId);
    List<Appointment> findByPatientIdAndDate(Long patientId, String date);
    List<Appointment> findByDoctorId(Long doctorId);
    List<Appointment> findByDoctorIdAndDate(Long doctorId, String date);

    @Query("SELECT a FROM Appointment a WHERE a.id = ?1 AND a.date > ?2")
    List<Appointment> findByDoctorIdAndDateFrom(Long doctorId, Date date);

    @Query(value = "SELECT a FROM Appointment a WHERE a.id = ?1 AND MONTH(a.date) = ?2", nativeQuery = true)
    List<Appointment> findByDoctorIdAndMonth(Long doctorId, int month);
}
