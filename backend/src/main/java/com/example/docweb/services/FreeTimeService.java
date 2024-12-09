package com.example.docweb.services;

import com.example.docweb.entity.Doctor;
import com.example.docweb.entity.FreeTime;
import com.example.docweb.entity.ScheduleTime;
import com.example.docweb.entity.User;
import com.example.docweb.exception.IdNotFoundException;
import com.example.docweb.exception.OperationFailedException;
import com.example.docweb.repository.DoctorRepository;
import com.example.docweb.repository.FreeTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class FreeTimeService {

    private final FreeTimeRepository freeTimeRepository;
    private final DoctorRepository doctorRepository;
    private final TimeService timeService;
    private final UserService userService;

    @Autowired
    public FreeTimeService(FreeTimeRepository freeTimeRepository, DoctorRepository doctorRepository, TimeService timeService, UserService userService) {
        this.freeTimeRepository = freeTimeRepository;
        this.doctorRepository = doctorRepository;
        this.timeService = timeService;
        this.userService = userService;
    }

    public List<FreeTime> getFreeTimesByDoctorId(long doctorId) {
        return freeTimeRepository.findByDoctorId(doctorId);
    }

    public List<FreeTime> saveFreeTimeList(List<FreeTime> freeTimeList) {
        if (freeTimeList.isEmpty()) throw new OperationFailedException();
        Long doctorId = userService.getUserId();
        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);
        if (doctor == null) throw new OperationFailedException();

        List<FreeTime> result = new ArrayList<>();
        for (FreeTime freeTime : freeTimeList) {
            freeTime.setTimeList(timeService.saveTimeList(freeTime.getTimeList()));
            freeTime.setDoctor(doctor);
            freeTime.setDate(freeTime.getDate());
            result.add(saveFreeTime(freeTime));
        }
        freeTimeRepository.saveAll(result);
        return result;
    }

    private FreeTime saveFreeTime(FreeTime freeTime) {
        Optional<FreeTime> foundScheduleTime;
        if (freeTime.getId() != null)
            foundScheduleTime = freeTimeRepository.findById(freeTime.getId());
        else
            foundScheduleTime = Optional.empty();
        FreeTime newScheduleTime;

        if (foundScheduleTime.isEmpty()) {
            // There must be only one ScheduleTIme for a given doctorId and day combination.
            FreeTime foundScheduleTime2 = freeTimeRepository.findByDoctorIdAndDate(freeTime.getDoctor().getId(), freeTime.getDate());
            newScheduleTime = Objects.requireNonNullElseGet(foundScheduleTime2, FreeTime::new);
        } else {
            // Update schedule time with given id.
            newScheduleTime = foundScheduleTime.get();
        }

        newScheduleTime.setDate(freeTime.getDate());
        newScheduleTime.setTimeList(freeTime.getTimeList());
        newScheduleTime.setDoctor(freeTime.getDoctor());

        return freeTime;
    }
}
