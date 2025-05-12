package com.planedle.backend.model;

import java.util.List;

public class AirlineAircraftResponse {
    private List<AirlineAircraftDTO> data;

    public List<AirlineAircraftDTO> getData() {
        return data;
    }

    public void setData(List<AirlineAircraftDTO> data) {
        this.data = data;
    }
}
