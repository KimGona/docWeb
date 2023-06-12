package com.example.docweb.repository;

import com.example.docweb.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
    List<Appointment> findByPatientId(Long patientId);
    List<Appointment> findByPatientIdAndDate(Long patientId, Date date);
    List<Appointment> findByDoctorId(Long doctorId);
    List<Appointment> findByDoctorIdAndDate(Long doctorId, Date date);

    @Query(value = "SELECT * " +
            "FROM appointments a WHERE a.doctor_id = ?1 AND a.date > ?2", nativeQuery = true)
    List<Appointment> findByDoctorIdAndDateFrom(Long doctorId, Date date);

    @Query(value = "SELECT * " +
            "FROM appointments a WHERE a.patient_id = ?1 AND a.date > ?2", nativeQuery = true)
    List<Appointment> findByPatientIdAndDateFrom(Long patientId, Date date);

    @Query(value = "SELECT * " +
            "FROM appointments a " +
            "WHERE a.doctor_id = ?1 AND MONTH(a.date) = ?2 AND YEAR(a.date) = ?3", nativeQuery = true)
    List<Appointment> findByDoctorIdAndMonth(Long doctorId, int month, int year);

    @Query(value = "SELECT * " +
            "FROM appointments a " +
            "WHERE a.patient_id = ?1 AND MONTH(a.date) = ?2 AND YEAR(a.date) = ?3", nativeQuery = true)
    List<Appointment> findByPatientIdAndMonth(Long patientId, int month, int year);
}
