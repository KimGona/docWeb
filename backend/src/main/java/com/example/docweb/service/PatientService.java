package com.example.docweb.service;

import com.example.docweb.entity.Patient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class PatientService {

    ArrayList<Patient> patientList=new ArrayList<Patient>();

    public PatientService() {
    }
    private boolean isEmpty(){
        return patientList.size()==0;
    }

    public List<Patient> getAllPatient(){
        return patientList;
    }

    public void addPatient(Patient patient){
        patientList.add(patient);
    }

    public Patient getPatientById(long id){
        for(Patient patient:patientList){
            if(patient.getId()==id)
                return patient;
        }
        return null;
    }

    public Patient getPatient(Patient patient){
        return getPatientById(patient.getId());
    }

    public void updatePatient(Patient patient){
        deletePatient(patient);
        patientList.add(patient);
    }

    public void deletePatient(Patient patient){
        patientList.remove(getPatientById(patient.getId()));
    }

    public void deletePatientById(long id){
        patientList.remove(getPatientById(id));
    }


}
