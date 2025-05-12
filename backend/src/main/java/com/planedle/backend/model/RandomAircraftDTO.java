package com.planedle.backend.model;

public class RandomAircraftDTO {
    private String airline;
    private String aircraft;

    public RandomAircraftDTO(String airline, String aircraft) {
        this.airline = airline;
        this.aircraft = aircraft;
    }

    public String getAirline() {
        return airline;
    }

    public String getAircraft() {
        return aircraft;
    }
}
