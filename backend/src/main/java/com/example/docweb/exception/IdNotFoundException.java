package com.example.docweb.exception;

public class IdNotFoundException  extends RuntimeException {
    public IdNotFoundException() {
        super("Id not found.");
    }
}