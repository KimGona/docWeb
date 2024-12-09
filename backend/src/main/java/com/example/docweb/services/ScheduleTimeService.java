package com.example.docweb.services;

import ch.qos.logback.core.joran.sanity.Pair;
import com.example.docweb.dto.AvailableScheduleTime;
import com.example.docweb.dto.AvailableScheduleTimeHour;
import com.example.docweb.dto.AvailableTime;
import com.example.docweb.entity.*;
import com.example.docweb.exception.IdNotFoundException;
import com.example.docweb.exception.OperationFailedException;
import com.example.docweb.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ScheduleTimeService {

    private final ScheduleTimeRepository scheduleTimeRepository;
    private final FreeTimeRepository freeTimeRepository;
    private final DoctorRepository doctorRepository;
    private final TimeRepository timeRepository;
    private final AppointmentRepository appointmentRepository;
    private final UserService userService;

    static class DayHour {
        public int day;
        public int hour;

        public DayHour(int day, int hour) {
            this.day = day;
            this.hour = hour;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            DayHour dayHour = (DayHour) o;
            return day == dayHour.day && hour == dayHour.hour;
        }

        @Override
        public int hashCode() {
            return Objects.hash(day, hour);
        }
    }

    @Autowired
    public ScheduleTimeService(
            ScheduleTimeRepository scheduleTimeRepository,
            FreeTimeRepository freeTimeRepository,
            DoctorRepository doctorRepository,
            TimeRepository timeRepository,
            AppointmentRepository appointmentRepository,
            UserService userService
    ) {
        this.scheduleTimeRepository = scheduleTimeRepository;
        this.freeTimeRepository = freeTimeRepository;
        this.doctorRepository = doctorRepository;
        this.timeRepository = timeRepository;
        this.appointmentRepository = appointmentRepository;
        this.userService = userService;
    }

    public List<AvailableScheduleTime> getAvailableHoursByLoggedInUserAndDates(String[] dates) {
        long id = userService.getUserId();
        return Arrays.stream(dates).map( date -> {
            DayOfWeek dayOfWeek = LocalDate.parse(date).getDayOfWeek();
            String dayName = dayOfWeek.getDisplayName(TextStyle.FULL, Locale.ENGLISH);
            Integer day = dayOfWeek.getValue();

            List<AvailableScheduleTimeHour> hours = getAvailableHoursWithTaken(id, date);
            String schedule = getDoctorSchedule(id, day);
            return new AvailableScheduleTime(dayName, date, schedule, hours);
        }).collect(Collectors.toList());
    }

    public List<Integer> getAvailableHoursByLoggedInUserAndDate(String date) {
        long id = userService.getUserId();
        return getAvailableHoursByDoctorIdAndDate(id, date);
    }

    public List<AvailableTime> getAvailableHoursByDoctorIdAndDates(long id, String[] dates) {
        return Arrays.stream(dates).map( date -> {
            List<Integer> available = getAvailableHoursByDoctorIdAndDate(id, date);
            String dayName = LocalDate.parse(date).getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.ENGLISH);
            return new AvailableTime(dayName, date, available);
        }).collect(Collectors.toList());
    }

    public List<Integer> getAvailableHoursByDoctorIdAndDate(long id, String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd").withLocale(Locale.ENGLISH);
        LocalDate localDate;
        try {
            localDate = LocalDate.parse(date, formatter);
        } catch (Exception exception){
            exception.printStackTrace();
            throw new OperationFailedException();
        }
        int dayOfWeek = localDate.getDayOfWeek().getValue();

        SimpleDateFormat formatter2 = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        Date date2;
        try {
            date2 = formatter2.parse(date);
        } catch (Exception exception){
            System.out.println("Date 2 failed.");
            exception.printStackTrace();
            throw new OperationFailedException();
        }

        ScheduleTime schedule = scheduleTimeRepository.findByDoctorIdAndDay(id, dayOfWeek).orElse(null);
        List<Time> scheduleTimeList = Collections.emptyList();
        if (schedule != null) {
            scheduleTimeList = schedule.getTimeList();
        }
        FreeTime freeTime = freeTimeRepository.findByDoctorIdAndDate(id, date2);
        List<Time> freeTimeList = Collections.emptyList();
        if (freeTime != null) {
            freeTimeList = freeTime.getTimeList();
        }
        List<Appointment> appointments = appointmentRepository.findByDoctorIdAndDate(id, date2);
        List<Integer> appointmentTimes = appointments.stream().map(Appointment::getHour).collect(Collectors.toList());

        // Filter the schedule times list not to include any of the free times.
        return scheduleTimeList.stream()
                .distinct()
                .filter(Predicate.not(freeTimeList::contains))
                .map(Time::getHour)
                .filter(hour -> !appointmentTimes.contains(hour))
                .collect(Collectors.toList());
    }

    public List<Integer> getAvailableDaysByDoctorIdAndMonth(long id) {
        LocalDate currentDate = LocalDate.now();
        int current_month = currentDate.getMonthValue();
        int current_year = currentDate.getYear();

        YearMonth ym = YearMonth.of(current_year, current_month);
        LocalDate firstOfMonth = ym.atDay(1);
        LocalDate firstOfFollowingMonth = ym.plusMonths(1).atDay(1);
        List<LocalDate> days = firstOfMonth.datesUntil(firstOfFollowingMonth).collect(Collectors.toList());

        List<ScheduleTime> schedule = scheduleTimeRepository.findByDoctorId(id);
        List<FreeTime> freeTimes = freeTimeRepository.findByDoctorIdAndMonth(id, current_month, current_year);
        List<Appointment> appointments = appointmentRepository.findByDoctorIdAndMonth(id, current_month, current_year);

        Set<DayHour> daySet = days.stream()
                .flatMap(t -> {
                    if (schedule.stream().map(ScheduleTime::getDay).collect(Collectors.toList()).contains(t.getDayOfWeek().getValue())) {
                        ScheduleTime s = schedule.stream().filter(y -> y.getDay() == t.getDayOfWeek().getValue()).findFirst().get();
                        return s.getTimeList().stream().map(p -> new DayHour(t.getDayOfMonth(), p.getHour()));
                    }
                    return Stream.empty();
                })
                .collect(Collectors.toSet());

        Set<DayHour> freeTimesMapped = freeTimes.stream().flatMap(o ->
                o.getTimeList().stream().map(i ->
                        new DayHour(o.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getDayOfMonth(), i.getHour()))
        ).collect(Collectors.toSet());

        Set<DayHour> appointmentsMapped = appointments.stream().map(o ->
                new DayHour(o.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getDayOfMonth(), o.getHour())
        ).collect(Collectors.toSet());

        daySet.removeAll(freeTimesMapped);
        daySet.removeAll(appointmentsMapped);

        return daySet.stream().map(t -> t.day).distinct().collect(Collectors.toList());
    }

    public List<ScheduleTime> getScheduleTimesByDoctorId(long id) {
        return scheduleTimeRepository.findByDoctorId(id);
    }

    public ScheduleTime getScheduleTimesByDoctorId(long id, Integer day) {
        Optional<ScheduleTime> time = scheduleTimeRepository.findByDoctorIdAndDay(id, day);
        return time.orElse(null);
    }

    public String getDoctorSchedule(long id, Integer day) {
        ScheduleTime scheduleTime = getScheduleTimesByDoctorId(id, day);
        if (scheduleTime != null) {
            List<Time> timeList = scheduleTime.getTimeList();
            Integer firstHour = timeList.get(0).getHour();
            Integer lastHour = timeList.get(timeList.size() - 1).getHour();
            return firstHour + ":00 - " + lastHour + ":00";
        } else {
            return "";
        }
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
            Optional<ScheduleTime> foundScheduleTime2 = scheduleTimeRepository.findByDoctorIdAndDay(scheduleTime.getDoctor().getId(), scheduleTime.getDay());
            newScheduleTime = foundScheduleTime2.orElseGet(ScheduleTime::new);
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

    private List<AvailableScheduleTimeHour> getAvailableHoursWithTaken(long id, String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd").withLocale(Locale.ENGLISH);
        LocalDate localDate;
        try {
            localDate = LocalDate.parse(date, formatter);
        } catch (Exception exception){
            exception.printStackTrace();
            throw new OperationFailedException();
        }
        int dayOfWeek = localDate.getDayOfWeek().getValue();

        SimpleDateFormat formatter2 = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        Date date2;
        try {
            date2 = formatter2.parse(date);
        } catch (Exception exception){
            System.out.println("Date 2 failed.");
            exception.printStackTrace();
            throw new OperationFailedException();
        }

        ScheduleTime schedule = scheduleTimeRepository.findByDoctorIdAndDay(id, dayOfWeek).orElse(null);
        List<Time> scheduleTimeList = Collections.emptyList();
        if (schedule != null) {
            scheduleTimeList = schedule.getTimeList();
        }
        FreeTime freeTime = freeTimeRepository.findByDoctorIdAndDate(id, date2);
        List<Time> freeTimeList = Collections.emptyList();
        if (freeTime != null) {
            freeTimeList = freeTime.getTimeList();
        }
        List<Appointment> appointments = appointmentRepository.findByDoctorIdAndDate(id, date2);
        List<Integer> appointmentTimes = appointments.stream().map(Appointment::getHour).collect(Collectors.toList());

        List<Time> finalFreeTimeList = freeTimeList;
        return scheduleTimeList.stream()
                .distinct()
                .map(it -> {
                    boolean isTaken = appointmentTimes.contains(it.getHour());
                    boolean isFree = finalFreeTimeList.contains(it);
                    return new AvailableScheduleTimeHour(it.getHour(), isTaken, isFree);
                }).collect(Collectors.toList());
    }
}
