package com.example.docweb.Dto;


import com.example.docweb.entity.Address;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientDto {

    private int rownum;
    private Long id;
    private String name;
    private String surname;
    private Date dateOfBirth;
    private Address address;
    private String gender;

}
