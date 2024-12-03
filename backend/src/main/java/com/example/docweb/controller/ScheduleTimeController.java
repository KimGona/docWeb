package com.example.docweb.controller;

import com.example.docweb.dto.AvailableTime;
import com.example.docweb.dto.ScheduleTimeDto;
import com.example.docweb.entity.ScheduleTime;
import com.example.docweb.entity.Time;
import com.example.docweb.repository.TimeRepository;
import com.example.docweb.services.ScheduleTimeService;
import com.example.docweb.services.TimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/schedule-times")
public class ScheduleTimeController {
    private final ScheduleTimeService scheduleTimeService;

    @Autowired
    public ScheduleTimeController(ScheduleTimeService scheduleTimeService) {
        this.scheduleTimeService = scheduleTimeService;
    }

    @GetMapping("/doctor/{doctorId}/date/{date}")
    @PreAuthorize("permitAll()")
    ResponseEntity<List<Integer>> getAvailableHoursByDoctorIdAndDate(@PathVariable long doctorId, @PathVariable String date) {
        List<Integer> scheduleTimes = scheduleTimeService.getAvailableHoursByDoctorIdAndDate(doctorId, date);
        return new ResponseEntity<>(scheduleTimes, HttpStatus.OK);
    }

    @GetMapping("/doctor/{doctorId}/dates/{dates}")
    @PreAuthorize("permitAll()")
    ResponseEntity<List<AvailableTime>> getAvailableHoursByDoctorIdAndDates(@PathVariable long doctorId, @PathVariable String dates) {
        String[] datesSeparated = dates.split(",");
        List<AvailableTime> scheduleTimes = scheduleTimeService.getAvailableHoursByDoctorIdAndDates(doctorId, datesSeparated);
        return new ResponseEntity<>(scheduleTimes, HttpStatus.OK);
    }

    @GetMapping("/month/doctor/{doctorId}")
    @PreAuthorize("permitAll()")
    ResponseEntity<List<Integer>> getAvailableHoursByDoctorIdAndCurrentMonth(@PathVariable long doctorId) {
        List<Integer> scheduleTimes = scheduleTimeService.getAvailableDaysByDoctorIdAndMonth(doctorId);
        return new ResponseEntity<>(scheduleTimes, HttpStatus.OK);
    }

    @GetMapping("/current-doctor/date/{date}")
    @PreAuthorize("permitAll()")
    ResponseEntity<List<Integer>> getAvailableHoursByLoggedInUserAndDate(@PathVariable String date) {
        List<Integer> scheduleTimes = scheduleTimeService.getAvailableHoursByLoggedInUserAndDate(date);
        return new ResponseEntity<>(scheduleTimes, HttpStatus.OK);
    }

    @GetMapping("/doctor/{id}")
    @PreAuthorize("permitAll()")
    ResponseEntity<List<ScheduleTimeDto>> getScheduleTimesByDoctorId(@PathVariable long id) {
        List<ScheduleTime> scheduleTimes = scheduleTimeService.getScheduleTimesByDoctorId(id);
        return new ResponseEntity<>(scheduleTimes.stream().map(ScheduleTime::toDto).collect(Collectors.toList()), HttpStatus.OK);
    }

    @Transactional
    @PostMapping
    @PreAuthorize("permitAll()")
    ResponseEntity<List<ScheduleTimeDto>> saveScheduleTimeList(@RequestBody List<ScheduleTimeDto> scheduleTimeDtoList) {
        List<ScheduleTime> scheduleTimeList = scheduleTimeDtoList.stream().map(ScheduleTimeDto::toScheduleTime).collect(Collectors.toList());
        List<ScheduleTime> updatedScheduleTimeList = scheduleTimeService.saveScheduleList(scheduleTimeList);
        return new ResponseEntity<>(updatedScheduleTimeList.stream().map(ScheduleTime::toDto).collect(Collectors.toList()), HttpStatus.OK);
    }
}