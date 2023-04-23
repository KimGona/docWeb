package com.example.docweb.controller;

import com.example.docweb.dto.ScheduleTimeDto;
import com.example.docweb.entity.ScheduleTime;
import com.example.docweb.services.ScheduleTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/schedule-times")
class ScheduleTimeController {
    private ScheduleTimeService scheduleTimeService;

    @Autowired
    public ScheduleTimeController(ScheduleTimeService scheduleTimeService) {
        this.scheduleTimeService = scheduleTimeService;
    }

    @GetMapping("/doctor/{doctorId}/date/{date}")
    ResponseEntity<List<Integer>> getAvailableHoursByDoctorIdAndDate(@PathVariable long doctorId, @PathVariable String date) {
        List<Integer> scheduleTimes = scheduleTimeService.getAvailableHoursByDoctorIdAndDate(doctorId, date);
        return new ResponseEntity<>(scheduleTimes, HttpStatus.OK);
    }

    @GetMapping("/doctor/{id}")
    ResponseEntity<List<ScheduleTimeDto>> getScheduleTimesByDoctorId(@PathVariable long id) {
        List<ScheduleTime> scheduleTimes = scheduleTimeService.getScheduleTimesByDoctorId(id);
        return new ResponseEntity<>(scheduleTimes.stream().map(ScheduleTime::toDto).collect(Collectors.toList()), HttpStatus.OK);
    }

    @PostMapping
    ResponseEntity<List<ScheduleTimeDto>> saveScheduleTimeList(@RequestBody List<ScheduleTimeDto> scheduleTimeDtoList) {
        List<ScheduleTime> scheduleTimeList = scheduleTimeService
                .saveScheduleList(scheduleTimeDtoList.stream().map(ScheduleTimeDto::toScheduleTime).collect(Collectors.toList()));
        return new ResponseEntity<>(scheduleTimeList.stream().map(ScheduleTime::toDto).collect(Collectors.toList()), HttpStatus.OK);
    }
}