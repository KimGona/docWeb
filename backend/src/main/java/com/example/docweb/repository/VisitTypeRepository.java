package com.example.docweb.repository;

import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.VisitType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitTypeRepository extends JpaRepository<VisitType,Long> {
}
