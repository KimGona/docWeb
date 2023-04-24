package com.example.docweb.controller;

import com.example.docweb.dto.FreeTimeDto;
import com.example.docweb.entity.FreeTime;
import com.example.docweb.services.FreeTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/free-times")
public class FreeTimeController {
    private final FreeTimeService freeTimeService;

    @Autowired
    public FreeTimeController(FreeTimeService freeTimeService) {
        this.freeTimeService = freeTimeService;
    }

    @GetMapping("/doctor/{id}")
    ResponseEntity<List<FreeTimeDto>> getFreeTimesByDoctorId(@PathVariable long id) {
        List<FreeTime> freeTimes = freeTimeService.getFreeTimesByDoctorId(id);
        return new ResponseEntity<>(freeTimes.stream().map(FreeTime::toDto).collect(Collectors.toList()), HttpStatus.OK);
    }

    @Transactional
    @PostMapping
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    ResponseEntity<List<FreeTimeDto>> saveFreeTimeList(@RequestBody List<FreeTimeDto> freeTimeDtoList) {
        List<FreeTime> freeTimes = freeTimeService.saveFreeTimeList(freeTimeDtoList.stream().map(FreeTimeDto::toFreeTime).collect(Collectors.toList()));
        return new ResponseEntity<>(freeTimes.stream().map(FreeTime::toDto).collect(Collectors.toList()), HttpStatus.OK);
    }
}
