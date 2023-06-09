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
    @Column(unique = true)
    private String description;

    public static VisitTypeDto toDto(VisitType visitType) {
        VisitTypeDto visitTypeDto = new VisitTypeDto();
        visitTypeDto.setId(visitType.getId());
        visitTypeDto.setDescription(visitType.getDescription());
        return visitTypeDto;
    }
}
