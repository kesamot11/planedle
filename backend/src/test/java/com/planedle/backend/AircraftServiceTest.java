package com.planedle.backend;

import com.planedle.backend.auth.JwtService;
import com.planedle.backend.model.RandomAircraftDTO;
import com.planedle.backend.repository.UserRepository;
import com.planedle.backend.service.AircraftService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class AircraftServiceTest {
    @Autowired
    private AircraftService aircraftService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private UserRepository userRepository;

    @Test
    public void testRandomAircraftIsNotNull() {
        RandomAircraftDTO random = aircraftService.getRandomAircraft("EASY");
        assertNotNull(random);
        assertNotNull(random.getAircraft());
        assertNotNull(random.getAirline());
    }
}
