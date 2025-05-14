package com.planedle.backend.model;

public enum Difficulty {
    EASY,
    MEDIUM,
    HARD;

    public boolean includes(Difficulty other) {
        return switch (this) {
            case HARD -> true; // includes MEDIUM + EASY
            case MEDIUM -> other == MEDIUM || other == EASY;
            case EASY -> other == EASY;
        };
    }
}
