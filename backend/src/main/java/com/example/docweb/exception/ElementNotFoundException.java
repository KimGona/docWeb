package com.example.docweb.exception;

public class ElementNotFoundException extends RuntimeException {
    public ElementNotFoundException() {
        super("Element not found");
    }
}
