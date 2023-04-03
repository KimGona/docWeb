package com.example.docweb.services;

import com.example.docweb.entity.Appointment;
import com.example.docweb.entity.HealthResult;
import com.example.docweb.exception.OperationFailedException;
import com.example.docweb.repository.AppointmentRepository;
import com.example.docweb.repository.HealthResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HealthResultService {
    private final HealthResultRepository healthResultRepository;
    private final AppointmentRepository appointmentRepository;

    @Autowired
    public HealthResultService(HealthResultRepository healthResultRepository, AppointmentRepository appointmentRepository) {
        this.healthResultRepository = healthResultRepository;
        this.appointmentRepository = appointmentRepository;
    }

    public List<HealthResult> getHealthResultsByPatientId(long id) {
        return healthResultRepository.findByPatientId(id);
    }

    public List<HealthResult> getHealthResultsByDoctorId(long id) {
        return healthResultRepository.findByDoctorId(id);
    }

    public HealthResult saveHealthResult(HealthResult healthResult) {
        if (healthResult.getAppointment().isHasHealthResultWritten()) {
            throw new OperationFailedException();
        }
        // mark that related appointment has health result
        Appointment appointment = healthResult.getAppointment();
        appointment.setHasHealthResultWritten(true);
        appointmentRepository.save(appointment);

        return healthResultRepository.save(healthResult);
    }
}
