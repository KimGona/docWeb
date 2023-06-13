package com.example.docweb.services;

import com.example.docweb.entity.Time;
import com.example.docweb.exception.OperationFailedException;
import com.example.docweb.repository.TimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class TimeService {

    private final TimeRepository timeRepository;

    @Autowired
    public TimeService(TimeRepository timeRepository) {
        this.timeRepository = timeRepository;
    }

    public List<Time> getAllTimes() {
        return timeRepository.findAll();
    }

    public List<Time> saveTimeList(List<Time> timeList) {
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
}
