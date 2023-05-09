package com.example.docweb.services;

import com.example.docweb.entity.VisitType;
import com.example.docweb.exception.OperationFailedException;
import com.example.docweb.repository.VisitTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitTypeService {
    private final VisitTypeRepository visitTypeRepository;

    @Autowired
    public VisitTypeService(VisitTypeRepository visitTypeRepository) {
        this.visitTypeRepository = visitTypeRepository;
    }

    public List<VisitType> getAllVisitTypes() {
        return visitTypeRepository.findAll();
    }

    public VisitType saveVisitType(VisitType visitType) {
        return visitTypeRepository.save(visitType);
    }
}
