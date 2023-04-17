package com.example.docweb.dto;

import com.example.docweb.entity.Address;
import lombok.Data;

@Data
public class AddressDto {
    private String street;
    private int streetNumber;
    private String city;
    private String code;

    static Address toAddress(AddressDto addressDto) {
        Address address = new Address();
        address.setStreet(addressDto.getStreet());
        address.setStreetNumber(addressDto.getStreetNumber());
        address.setCity(addressDto.getCity());
        address.setCode(addressDto.getCode());
        return address;
    }
}
