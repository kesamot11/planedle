package com.planedle.backend.controller;

import com.planedle.backend.model.RandomAircraftDTO;
import com.planedle.backend.service.AircraftService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AirlineAircraftController {
    private final AircraftService aircraftService;

    public AirlineAircraftController(AircraftService aircraftService) {
        this.aircraftService = aircraftService;
    }

    @GetMapping("/random-aircraft")
    public RandomAircraftDTO getAirlinesAircraft(@RequestParam(defaultValue = "EASY") String difficulty) {
        return aircraftService.getRandomAircraft(difficulty.toLowerCase());
    }
}
