package com.autoride.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class LocationTest {

    @Test
    void distanceTo_SameLocation_ReturnsZero() {
        Location loc1 = Location.builder().latitude(32.0853).longitude(34.7818).build();
        Location loc2 = Location.builder().latitude(32.0853).longitude(34.7818).build();

        double distance = loc1.distanceTo(loc2);

        assertEquals(0.0, distance, "Distance between the same coordinates should be 0");
    }

    @Test
    void distanceTo_DifferentLocations_ReturnsCorrectDistance() {
        Location telAviv = Location.builder().latitude(32.0853).longitude(34.7818).build();
        Location jerusalem = Location.builder().latitude(31.7683).longitude(35.2137).build();

        double distance = telAviv.distanceTo(jerusalem);

        assertTrue(distance > 50.0 && distance < 60.0,
                "Distance between TLV and JRS should be around 54km, got: " + distance);
    }
}