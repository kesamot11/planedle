package com.planedle.backend;

import com.planedle.backend.controller.AirlineAircraftController;
import com.planedle.backend.model.Difficulty;
import com.planedle.backend.model.RandomAircraftDTO;
import com.planedle.backend.service.AircraftService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static com.planedle.backend.model.Difficulty.EASY;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AirlineAircraftController.class)
public class AircraftControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AircraftService aircraftService;

    @Test
    void testGetRandomAircraft_isOk() throws Exception {
        RandomAircraftDTO mockDTO = new RandomAircraftDTO("KLM", "Boeing 737-800", EASY);
        when(aircraftService.getRandomAircraft()).thenReturn(mockDTO);

        mockMvc.perform(get("/api/random-aircraft"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.airline").value("KLM"))
                .andExpect(jsonPath("$.aircraft").value("Boeing 737-800"))
                .andExpect(jsonPath("$.difficulty").value("EASY"));
    }
}
