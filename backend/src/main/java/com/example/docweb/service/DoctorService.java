package com.example.docweb.service;

import com.example.docweb.entity.Doctor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class DoctorService {

    ArrayList<Doctor> doctorList=new ArrayList<Doctor>();

    public DoctorService() {
    }
    private boolean isEmpty(){
        return doctorList.size()==0;
    }

    public List<Doctor> getAllDoctor(){
        return doctorList;
    }

    public void addDoctor(Doctor doctor){
        doctorList.add(doctor);
    }

    public Doctor getDoctorById(long id){
        for(Doctor doctor:doctorList){
            if(doctor.getId()==id)
                return doctor;
        }
        return null;
    }

    public Doctor getDoctor(Doctor doctor){
        return getDoctorById(doctor.getId());
    }

    public void updateDoctor(Doctor doctor){
        deleteDoctor(doctor);
        doctorList.add(doctor);
    }

    public void deleteDoctor(Doctor doctor){
        doctorList.remove(getDoctorById(doctor.getId()));
    }

    public void deleteDoctorById(long id){
        doctorList.remove(getDoctorById(id));
    }



}
