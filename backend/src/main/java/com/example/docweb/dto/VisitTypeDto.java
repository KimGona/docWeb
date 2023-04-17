package com.example.docweb.dto;

import com.example.docweb.entity.VisitType;
import lombok.Data;

@Data
public class VisitTypeDto {
    private Long id;
    private String description;

    static VisitType toVisitType(VisitTypeDto visitTypeDto) {
        VisitType visitType = new VisitType();
        visitType.setId(visitTypeDto.getId());
        visitType.setDescription(visitTypeDto.getDescription());
        return visitType;
    }
}
