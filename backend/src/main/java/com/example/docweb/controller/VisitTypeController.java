package com.example.docweb.controller;

import com.example.docweb.dto.AppointmentDto;
import com.example.docweb.dto.VisitTypeDto;
import com.example.docweb.entity.VisitType;
import com.example.docweb.services.VisitTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/visit-types")
public class VisitTypeController {
    private final VisitTypeService visitTypeService;

    @Autowired
    public VisitTypeController(VisitTypeService visitTypeService) {
        this.visitTypeService = visitTypeService;
    }

    @GetMapping
    ResponseEntity<List<VisitTypeDto>> getAllVisitTypes() {
        List<VisitType> visitTypes = visitTypeService.getAllVisitTypes();
        return new ResponseEntity<>(visitTypes.stream().map(VisitType::toDto).collect(Collectors.toList()), HttpStatus.OK);
    }

    @Transactional
    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    ResponseEntity<VisitTypeDto> saveVisitType(@RequestBody VisitTypeDto visitTypeDto) {
        VisitType visitType = visitTypeService.saveVisitType(VisitTypeDto.toVisitType(visitTypeDto));
        return new ResponseEntity<>(VisitType.toDto(visitType), HttpStatus.OK);
    }
}
