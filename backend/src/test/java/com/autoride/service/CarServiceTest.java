package com.autoride.service;

import com.autoride.entity.Car;
import com.autoride.entity.Location;
import com.autoride.repository.CarRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CarServiceTest {

    @Mock
    private CarRepository carRepository;

    @InjectMocks
    private CarService carService;

    private Location userLocation;
    private Car closeCar;
    private Car farCar;

    @BeforeEach
    void setUp() {
        userLocation = Location.builder().latitude(32.0).longitude(34.0).build();

        closeCar = Car.builder().id(1L).isAvailable(true).location(Location.builder()
                        .latitude(32.1).longitude(34.1).build()).build();

        farCar = Car.builder().id(2L).isAvailable(true).location(Location.builder()
                        .latitude(33.0).longitude(35.0).build()).build();
    }

    @Test
    void findClosestAvailableCar_CarsAvailable_ReturnsClosestCar() {
        when(carRepository.findByIsAvailableTrue()).thenReturn(List.of(farCar, closeCar));

        Car result = carService.findClosestAvailableCar(userLocation);

        assertNotNull(result);
        assertEquals(1L, result.getId(), "Should return the car with ID 1 as it is closer");
    }

    @Test
    void findClosestAvailableCar_NoCarsAvailable_ThrowsException() {
        when(carRepository.findByIsAvailableTrue()).thenReturn(List.of());

        assertThrows(EntityNotFoundException.class, () -> {
            carService.findClosestAvailableCar(userLocation);
        }, "Should throw ResourceNotFoundException when no cars are available");
    }
}