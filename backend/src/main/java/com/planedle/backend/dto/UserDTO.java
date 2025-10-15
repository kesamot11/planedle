package com.planedle.backend.dto;

public record UserDTO(Long id, String username, String email, int correctGuesses) {
}
