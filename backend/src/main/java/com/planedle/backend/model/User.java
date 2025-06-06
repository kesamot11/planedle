package com.planedle.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    private String username;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

    private int correctGuesses;

    public User() {
    }

    public @NotBlank String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank String password) {
        this.password = password;
    }

    public @NotBlank @Email String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank @Email String email) {
        this.email = email;
    }

    public @NotBlank String getUsername() {
        return username;
    }

    public void setUsername(@NotBlank String username) {
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getCorrectGuesses() {
        return correctGuesses;
    }

    public void setCorrectGuesses(int correctGuesses) {
        this.correctGuesses = correctGuesses;
    }
}
