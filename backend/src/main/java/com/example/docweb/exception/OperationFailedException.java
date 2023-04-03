package com.example.docweb.exception;

public class OperationFailedException extends RuntimeException {
    public OperationFailedException() {
        super("Operation failed");
    }
}
