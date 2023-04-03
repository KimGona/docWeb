package com.example.docweb.services;

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
import java.util.Date;
import java.util.List;
import java.util.Locale;
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

    public List<Integer> getAvailableHoursByDoctorIdAndDate(long id, String date) throws ParseException {
        LocalDate localDate = LocalDate.parse(date);
        int dayOfWeek = localDate.getDayOfWeek().getValue();

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        Date date2 = formatter.parse(date);

        List<Time> schedule = scheduleTimeRepository.findByDoctorIdAndDay(id, dayOfWeek).getTimeList();
        List<Time> freeTimes = freeTimeRepository.findByDoctorIdAndDate(id, date2).getTimeList();

        // filter the schedule times list not to include any of the free times
        return schedule.stream()
                .distinct()
                .filter(Predicate.not(freeTimes::contains))
                .map(Time::getHour)
                .collect(Collectors.toList());
    }

    public ScheduleTime saveSchedule(ScheduleTime scheduleTime) {
        int day = scheduleTime.getDay();
        if (1 <= day && day <= 7)
            return scheduleTimeRepository.save(scheduleTime);
        else
            throw new OperationFailedException();
    }
}
