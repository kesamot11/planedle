package com.planedle.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailAlreadyInUseException.class)
    public ResponseEntity<Map<String, Object>> handleEmailConflict(EmailAlreadyInUseException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(
                Map.of("error", "email", "message", ex.getMessage())
        );
    }

    @ExceptionHandler(UsernameAlreadyInUseException.class)
    public ResponseEntity<Map<String, Object>> handleUsernameConflict(UsernameAlreadyInUseException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(
                Map.of("error", "username", "message", ex.getMessage())
        );
    }
}

