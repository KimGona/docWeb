package com.example.docweb.services;

import com.example.docweb.entity.FreeTime;
import com.example.docweb.exception.OperationFailedException;
import com.example.docweb.repository.FreeTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FreeTimeService {

    private final FreeTimeRepository freeTimeRepository;

    @Autowired
    public FreeTimeService(FreeTimeRepository freeTimeRepository) {
        this.freeTimeRepository = freeTimeRepository;
    }

    public List<FreeTime> getFreeTimesByDoctorId(long doctorId) {
        return freeTimeRepository.findByDoctorId(doctorId);
    }

    public List<FreeTime> saveFreeTimeList(List<FreeTime> freeTimeList) {
        List<FreeTime> result = new ArrayList<>();
        for (FreeTime freeTime : freeTimeList) {
            result.add(saveFreeTime(freeTime));
        }
        return result;
    }

    private FreeTime saveFreeTime(FreeTime freeTime) {
        if (freeTimeRepository.existsById(freeTime.getId())
                || freeTimeRepository.findByDoctorIdAndDate(freeTime.getDoctor().getId(), freeTime.getDate()) != null
        ) {
            throw new OperationFailedException();
        }
        return freeTimeRepository.save(freeTime);
    }
}
