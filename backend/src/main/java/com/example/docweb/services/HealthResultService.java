package com.example.docweb.services;

import com.example.docweb.entity.Appointment;
import com.example.docweb.entity.HealthResult;
import com.example.docweb.repository.AppointmentRepository;
import com.example.docweb.repository.HealthResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class HealthResultService {
    private final HealthResultRepository healthResultRepository;
    private final AppointmentRepository appointmentRepository;
    private final UserService userService;

    @Autowired
    public HealthResultService(HealthResultRepository healthResultRepository, AppointmentRepository appointmentRepository, UserService userService) {
        this.healthResultRepository = healthResultRepository;
        this.appointmentRepository = appointmentRepository;
        this.userService = userService;
    }

    public List<HealthResult> getHealthResultsByPatientId() {
        Long id = userService.getUserId();
        return healthResultRepository.findByPatientId(id);
    }

    public List<HealthResult> getHealthResultsByPatientIdAndCurrentMonth() {
        Long id = userService.getUserId();
        LocalDate currentDate = LocalDate.now();
        return healthResultRepository.findByPatientIdAndMonth(id, currentDate.getMonthValue(), currentDate.getYear());
    }

    public List<HealthResult> getHealthResultsByDoctorIdAndMonth(int month, int year) {
        Long id = userService.getUserId();
        return healthResultRepository.findByDoctorIdAndMonth(id, month, year);
    }

    public List<HealthResult> getHealthResultsByDoctorId() {
        Long id = userService.getUserId();
        return healthResultRepository.findByDoctorId(id);
    }

    public HealthResult saveHealthResult(HealthResult healthResult) {
        Appointment appointment = healthResult.getAppointment();
        // No update allowed.
//        if (appointment.isHasHealthResultWritten()) {
//            throw new OperationFailedException();
//        }

        // Mark that related appointment has health result
        appointment.setHasHealthResultWritten(true);
        appointmentRepository.save(appointment);

        Date currentDate = new Date(System.currentTimeMillis());

        HealthResult newHealthResult = new HealthResult();
        newHealthResult.setDateAdded(currentDate);
        newHealthResult.setDescription(healthResult.getDescription());
        newHealthResult.setHeartRate(healthResult.getHeartRate());
        newHealthResult.setBloodSugar(healthResult.getBloodSugar());
        newHealthResult.setBloodPressure(healthResult.getBloodPressure());
        newHealthResult.setPatient(appointment.getPatient());
        newHealthResult.setDoctor(appointment.getDoctor());
        newHealthResult.setAppointment(appointment);

        return healthResultRepository.save(newHealthResult);
    }
}
