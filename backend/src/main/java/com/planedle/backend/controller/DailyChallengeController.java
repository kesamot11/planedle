package com.planedle.backend.controller;

import com.planedle.backend.model.RandomAircraftDTO;
import com.planedle.backend.service.AircraftService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/daily")
public class DailyChallengeController {

    private final AircraftService aircraftService;

    public DailyChallengeController(AircraftService aircraftService) {
        this.aircraftService = aircraftService;
    }

    @GetMapping
    public RandomAircraftDTO getDailyChallenge() {
        return aircraftService.getDailyAircraft();
    }
}
