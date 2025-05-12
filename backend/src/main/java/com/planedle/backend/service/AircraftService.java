package com.planedle.backend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.planedle.backend.model.AirlineAircraftDTO;
import com.planedle.backend.model.RandomAircraftDTO;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Random;

@Service
public class AircraftService {
    private List<AirlineAircraftDTO> airlineAircrafts;

    public AircraftService() throws IOException {
        Resource resource = new ClassPathResource("aircrafts.json");
        InputStream inputStream = resource.getInputStream();

        ObjectMapper objectMapper = new ObjectMapper();
        this.airlineAircrafts = objectMapper.readValue(inputStream, new TypeReference<List<AirlineAircraftDTO>>() {});
    }

    public RandomAircraftDTO getRandomAircraft() {
        int index = new Random().nextInt(this.airlineAircrafts.size());
        AirlineAircraftDTO aaDTO = this.airlineAircrafts.get(index);
        String airline = aaDTO.airline();
        int random = new Random().nextInt(aaDTO.aircrafts().size());
        String aircraft = aaDTO.aircrafts().get(random);
        return new RandomAircraftDTO(airline, aircraft);
    }
}
