package com.example.docweb.service;


import com.example.docweb.entity.Admin;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    ArrayList<Admin> adminList=new ArrayList<Admin>();

    public AdminService() {
    }
    private boolean isEmpty(){
        return adminList.size()==0;
    }

    public List<Admin> getAllAdmin(){
        return adminList;
    }

    public void addAdmin(Admin admin){
        adminList.add(admin);
    }

    public Admin getAdminById(long id){
        for(Admin admin:adminList){
            if(admin.getId()==id)
                return admin;
        }
        return null;
    }

    public Admin getAdmin(Admin admin){
        return getAdminById(admin.getId());
    }

    public void updateAdmin(Admin admin){
        deleteAdmin(admin);
        adminList.add(admin);
    }

    public void deleteAdmin(Admin admin){
        adminList.remove(getAdminById(admin.getId()));
    }

    public void deleteAdminById(long id){
        adminList.remove(getAdminById(id));
    }



}

