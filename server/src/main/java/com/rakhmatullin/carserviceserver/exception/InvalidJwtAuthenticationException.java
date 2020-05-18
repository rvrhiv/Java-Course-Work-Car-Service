package com.rakhmatullin.carserviceserver.exception;

public class InvalidJwtAuthenticationException extends RuntimeException {
    public InvalidJwtAuthenticationException() {
    }

    public InvalidJwtAuthenticationException(String message) {
        super(message);
    }
}
