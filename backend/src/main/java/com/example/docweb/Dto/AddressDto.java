package com.example.docweb.Dto;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AddressDto {

    private int rownum;
    private String street;
    private int streetNumber;
    private String city;
    private String code;
}
