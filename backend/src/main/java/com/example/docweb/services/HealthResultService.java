package com.example.docweb.services;

import com.example.docweb.entity.Appointment;
import com.example.docweb.entity.HealthResult;
import com.example.docweb.exception.OperationFailedException;
import com.example.docweb.repository.AppointmentRepository;
import com.example.docweb.repository.HealthResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

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

    public List<HealthResult> getHealthResultsByDoctorId() {
        Long id = userService.getUserId();
        return healthResultRepository.findByDoctorId(id);
    }

    public HealthResult saveHealthResult(HealthResult healthResult) {
        Appointment appointment = healthResult.getAppointment();
        // No update allowed.
        if (appointment.isHasHealthResultWritten()) {
            throw new OperationFailedException();
        }

        // Mark that related appointment has health result
        appointment.setHasHealthResultWritten(true);
        appointmentRepository.save(appointment);

        LocalDate localDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedString = localDate.format(formatter);

        HealthResult newHealthResult = new HealthResult();
        newHealthResult.setDateAdded(formattedString);
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
