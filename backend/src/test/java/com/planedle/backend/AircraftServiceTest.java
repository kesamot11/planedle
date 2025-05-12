package com.planedle.backend;

import com.planedle.backend.model.RandomAircraftDTO;
import com.planedle.backend.service.AircraftService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class AircraftServiceTest {
    @Autowired
    private AircraftService aircraftService;

    @Test
    public void testRandomAircraftIsNotNull() {
        RandomAircraftDTO random = aircraftService.getRandomAircraft();
        assertNotNull(random);
        assertNotNull(random.getAircraft());
        assertNotNull(random.getAirline());
    }
}
