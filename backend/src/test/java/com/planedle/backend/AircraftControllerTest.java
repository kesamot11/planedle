package com.planedle.backend;

import com.planedle.backend.auth.JwtService;
import com.planedle.backend.controller.AirlineAircraftController;
import com.planedle.backend.model.RandomAircraftDTO;
import com.planedle.backend.repository.UserRepository;
import com.planedle.backend.service.AircraftService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import static com.planedle.backend.model.Difficulty.EASY;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = AirlineAircraftController.class)
@AutoConfigureMockMvc(addFilters = false)
class AirlineAircraftControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AircraftService aircraftService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private UserRepository userRepository;

    @Test
    void getAirlinesAircraft_returnsRandomAircraftDTO() throws Exception {
        RandomAircraftDTO mockAircraft = new RandomAircraftDTO("KLM", "Boeing 737-800", EASY);

        when(aircraftService.getRandomAircraft("easy")).thenReturn(mockAircraft);

        mockMvc.perform(get("/api/random-aircraft")
                        .param("difficulty", "EASY"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.aircraft").value("Boeing 737-800"))
                .andExpect(jsonPath("$.airline").value("KLM"))
                .andExpect(jsonPath("$.difficulty").value("EASY"));
    }

    @Test
    void getAirlinesAircraft_defaultsToEasyDifficulty() throws Exception {
        RandomAircraftDTO mockAircraft = new RandomAircraftDTO("KLM", "Boeing 737-800", EASY);

        when(aircraftService.getRandomAircraft("easy")).thenReturn(mockAircraft);

        mockMvc.perform(get("/api/random-aircraft"))  // no param provided
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.difficulty").value("EASY"));
    }
}
