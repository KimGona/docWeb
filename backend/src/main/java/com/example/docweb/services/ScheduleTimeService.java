package com.example.docweb.services;

import com.example.docweb.entity.Appointment;
import com.example.docweb.entity.ScheduleTime;
import com.example.docweb.entity.Time;
import com.example.docweb.exception.OperationFailedException;
import com.example.docweb.repository.FreeTimeRepository;
import com.example.docweb.repository.ScheduleTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class ScheduleTimeService {

    private final ScheduleTimeRepository scheduleTimeRepository;
    private final FreeTimeRepository freeTimeRepository;

    @Autowired
    public ScheduleTimeService(ScheduleTimeRepository scheduleTimeRepository, FreeTimeRepository freeTimeRepository) {
        this.scheduleTimeRepository = scheduleTimeRepository;
        this.freeTimeRepository = freeTimeRepository;
    }

    public List<Integer> getAvailableHoursByDoctorIdAndDate(long id, String date) {
        LocalDate localDate;
        try {
            localDate = LocalDate.parse(date);
        } catch (Exception exception){
            throw new OperationFailedException();
        }
        int dayOfWeek = localDate.getDayOfWeek().getValue();

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        Date date2;
        try {
            date2 = formatter.parse(date);
        } catch (Exception exception){
            throw new OperationFailedException();
        };

        List<Time> schedule = scheduleTimeRepository.findByDoctorIdAndDay(id, dayOfWeek).getTimeList();
        List<Time> freeTimes = freeTimeRepository.findByDoctorIdAndDate(id, date2).getTimeList();

        // Filter the schedule times list not to include any of the free times.
        return schedule.stream()
                .distinct()
                .filter(Predicate.not(freeTimes::contains))
                .map(Time::getHour)
                .collect(Collectors.toList());
    }

    public List<ScheduleTime> getScheduleTimesByDoctorId(long id) {
        return scheduleTimeRepository.findByDoctorId(id);
    }

    public List<ScheduleTime> saveScheduleList(List<ScheduleTime> scheduleTimeList) {
        List<ScheduleTime> result = new ArrayList<>();
        for (ScheduleTime scheduleTime : scheduleTimeList) {
            result.add(saveSchedule(scheduleTime));
        }
        return result;
    }

    private ScheduleTime saveSchedule(ScheduleTime scheduleTime) {
        int day = scheduleTime.getDay();
        if (day < 1 || day > 7)
            throw new OperationFailedException();

        Optional<ScheduleTime> foundScheduleTime = scheduleTimeRepository.findById(scheduleTime.getId());
        ScheduleTime newScheduleTime;

        if (foundScheduleTime.isEmpty()) {
            // There must be only one ScheduleTIme for a given doctorId and day combination.
            ScheduleTime foundScheduleTime2 = scheduleTimeRepository.findByDoctorIdAndDay(scheduleTime.getDoctor().getId(), scheduleTime.getDay());
            if (foundScheduleTime2 == null) {
                // Add new schedule time.
                newScheduleTime = new ScheduleTime();
            } else {
                // Update schedule time with given doctor id and day.
                newScheduleTime = foundScheduleTime2;
                newScheduleTime.setId(scheduleTime.getId());
            }
        } else {
            // Update schedule time with given id.
            newScheduleTime = foundScheduleTime.get();
            newScheduleTime.setId(scheduleTime.getId());
        }
        newScheduleTime.setDay(scheduleTime.getDay());
        newScheduleTime.setDayName(scheduleTime.getDayName());
        newScheduleTime.setTimeList(scheduleTime.getTimeList());
        newScheduleTime.setDoctor(scheduleTime.getDoctor());
        return newScheduleTime;
    }
}
