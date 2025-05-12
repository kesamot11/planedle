package com.planedle.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record AirlineAircraftDTO(
        @JsonProperty String airline,
        @JsonProperty("active_aircraft") List<String> aircrafts
) {
}
