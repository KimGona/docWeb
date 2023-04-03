package com.example.docweb.services;

import com.example.docweb.entity.Admin;
import com.example.docweb.exception.ElementNotFoundException;
import com.example.docweb.exception.OperationFailedException;
import com.example.docweb.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Admin findAdminById(long id) {
        return adminRepository.findById(id).orElseThrow(ElementNotFoundException::new);
    }

    public Admin saveAdmin(Admin admin) {
        if (admin.getId() != null && adminRepository.existsById(admin.getId())) {
            throw new OperationFailedException();
        }
        return adminRepository.save(admin);
    }
}
