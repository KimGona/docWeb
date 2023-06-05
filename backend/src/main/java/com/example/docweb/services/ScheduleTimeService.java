package com.example.docweb.services;

import com.example.docweb.entity.Appointment;
import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.ScheduleTime;
import com.example.docweb.entity.Time;
import com.example.docweb.exception.IdNotFoundException;
import com.example.docweb.exception.OperationFailedException;
import com.example.docweb.repository.DoctorRepository;
import com.example.docweb.repository.FreeTimeRepository;
import com.example.docweb.repository.ScheduleTimeRepository;
import com.example.docweb.repository.TimeRepository;
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
    private final DoctorRepository doctorRepository;
    private final TimeRepository timeRepository;

    @Autowired
    public ScheduleTimeService(
            ScheduleTimeRepository scheduleTimeRepository,
            FreeTimeRepository freeTimeRepository,
            DoctorRepository doctorRepository,
            TimeRepository timeRepository
    ) {
        this.scheduleTimeRepository = scheduleTimeRepository;
        this.freeTimeRepository = freeTimeRepository;
        this.doctorRepository = doctorRepository;
        this.timeRepository = timeRepository;
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
        if (scheduleTimeList.isEmpty()) throw new OperationFailedException();
        Long doctorId = scheduleTimeList.get(0).getDoctor().getId();
        if (doctorId == null) throw new IdNotFoundException();
        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);
        if (doctor == null) throw new OperationFailedException();

        List<ScheduleTime> result = new ArrayList<>();
        for (ScheduleTime scheduleTime : scheduleTimeList) {
            scheduleTime.setDoctor(doctor);
            scheduleTime.setTimeList(saveTimeList(scheduleTime.getTimeList()));
            result.add(saveSchedule(scheduleTime));
        }
        scheduleTimeRepository.saveAll(result);
        return result;
    }

    private List<Time> saveTimeList(List<Time> timeList) {
        List<Time> result = new ArrayList<>();
        for (Time time : timeList) {
            result.add(saveTime(time));
        }
        timeRepository.saveAll(result);
        return result;
    }

    private Time saveTime(Time time) {
        Optional<Time> foundTime;
        if (time.getId() != null)
            foundTime = timeRepository.findById(time.getId());
        else
            foundTime = Optional.empty();
        Time newTime;

        if (foundTime.isEmpty()) {
            // There must be only one ScheduleTIme for a given doctorId and day combination.
            Time foundTime2 = timeRepository.findByHour(time.getHour());
            newTime = Objects.requireNonNullElseGet(foundTime2, Time::new);
        } else {
            // Update schedule time with given id.
            newTime = foundTime.get();
        }

        newTime.setHour(time.getHour());
        return newTime;
    }

    private ScheduleTime saveSchedule(ScheduleTime scheduleTime) {
        int day = scheduleTime.getDay();
        if (day < 1 || day > 7)
            throw new OperationFailedException();

        Optional<ScheduleTime> foundScheduleTime;
        if (scheduleTime.getId() != null)
            foundScheduleTime = scheduleTimeRepository.findById(scheduleTime.getId());
        else
            foundScheduleTime = Optional.empty();
        ScheduleTime newScheduleTime;

        if (foundScheduleTime.isEmpty()) {
            // There must be only one ScheduleTIme for a given doctorId and day combination.
            ScheduleTime foundScheduleTime2 = scheduleTimeRepository.findByDoctorIdAndDay(scheduleTime.getDoctor().getId(), scheduleTime.getDay());
            newScheduleTime = Objects.requireNonNullElseGet(foundScheduleTime2, ScheduleTime::new);
        } else {
            // Update schedule time with given id.
            newScheduleTime = foundScheduleTime.get();
        }
        newScheduleTime.setDay(scheduleTime.getDay());
        newScheduleTime.setDayName(scheduleTime.getDayName());
        newScheduleTime.setTimeList(scheduleTime.getTimeList());
        newScheduleTime.setDoctor(scheduleTime.getDoctor());
        return newScheduleTime;
    }
}
