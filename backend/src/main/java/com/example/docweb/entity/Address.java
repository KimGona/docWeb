package com.example.docweb.entity;

import com.example.docweb.dto.AddressDto;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class Address {
    private String street;
    private int streetNumber;
    private String city;
    private String code;

    static AddressDto toDto(Address address) {
        AddressDto addressDto = new AddressDto();
        addressDto.setStreet(address.getStreet());
        addressDto.setStreetNumber(address.getStreetNumber());
        addressDto.setCity(address.getCity());
        addressDto.setCode(address.getCode());
        return addressDto;
    }
}
