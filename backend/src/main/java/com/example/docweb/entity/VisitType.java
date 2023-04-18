package com.example.docweb.entity;
import com.example.docweb.dto.VisitTypeDto;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "visit_types")
public class VisitType {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String description;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    static VisitTypeDto toDto(VisitType visitType) {
        VisitTypeDto visitTypeDto = new VisitTypeDto();
        visitTypeDto.setId(visitType.getId());
        visitTypeDto.setDescription(visitType.getDescription());
        return visitTypeDto;
    }
}
