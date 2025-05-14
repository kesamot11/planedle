package com.planedle.backend.model;

public class RandomAircraftDTO {
    private String airline;
    private String aircraft;
    private Difficulty difficulty;

    public RandomAircraftDTO(String airline, String aircraft, Difficulty difficulty) {
        this.airline = airline;
        this.aircraft = aircraft;
        this.difficulty = difficulty;
    }

    public String getAirline() {
        return airline;
    }

    public String getAircraft() {
        return aircraft;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }
}
