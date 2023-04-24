package com.example.docweb.services;

import com.example.docweb.entity.Time;
import com.example.docweb.exception.OperationFailedException;
import com.example.docweb.repository.TimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
        return result;
    }

    private Time saveTime(Time time) {
        if (timeRepository.existsById(time.getId()) || timeRepository.existsByHour(time.getHour())) {
            throw new OperationFailedException();
        }
        return timeRepository.save(time);
    }
}
