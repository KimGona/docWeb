package com.example.docweb.entity;

import jakarta.persistence.Embeddable;

@Embeddable
public class Address {
    private String street;
    private int streetNumber;
    private String city;
    private String code;
}
