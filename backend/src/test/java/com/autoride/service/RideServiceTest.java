package com.autoride.service;

import com.autoride.entity.Car;
import com.autoride.entity.Location;
import com.autoride.entity.Ride;
import com.autoride.entity.User;
import com.autoride.repository.RideRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RideServiceTest {

    @Mock
    private RideRepository rideRepository;

    @Mock
    private UserService userService;

    @Mock
    private CarService carService;

    @InjectMocks
    private RideService rideService;

    private User validUser;
    private Car availableCar;

    @BeforeEach
    void setUp() {
        validUser = User.builder().id(1L).balance(BigDecimal.valueOf(50.0)).build();

        availableCar = Car.builder().id(1L).isAvailable(true).location(Location.builder().latitude(32.0).longitude(34.0)
                        .build()).pricePerMin(BigDecimal.valueOf(1.5)).build();
    }

    @Test
    void startRide_UserHasActiveRide_ThrowsException() {
        when(rideRepository.findByUser_IdAndEndTimeIsNull(1L)).thenReturn(Optional.of(new Ride()));

        assertThrows(IllegalStateException.class, () -> {
            rideService.startRide(1L);
        }, "Should throw exception if user already has an active ride");
    }

    @Test
    void startRide_UserHasZeroBalance_ThrowsException() {
        User poorUser = User.builder().id(2L).balance(BigDecimal.ZERO).build();

        when(rideRepository.findByUser_IdAndEndTimeIsNull(2L)).thenReturn(Optional.empty());
        when(userService.getUserById(2L)).thenReturn(poorUser);

        assertThrows(IllegalStateException.class, () -> {
            rideService.startRide(2L);
        }, "Should throw exception if user has zero or negative balance");
    }

    @Test
    void endRide_ValidRide_CalculatesCostAndUpdatesBalance() {
        Ride activeRide = Ride.builder().id(1L).user(validUser).car(availableCar)
                .startTime(LocalDateTime.now().minusHours(1)).build();

        Location endLocation = Location.builder().latitude(32.1).longitude(34.1).build();

        when(rideRepository.findByUser_IdAndEndTimeIsNull(1L)).thenReturn(Optional.of(activeRide));
        when(rideRepository.save(any(Ride.class))).thenReturn(activeRide);

        Ride completedRide = rideService.endRide(1L, endLocation);

        assertNotNull(completedRide.getEndTime(), "End time should be set");
        assertNotNull(completedRide.getTotalCost(), "Total cost should be calculated");
        assertTrue(completedRide.getTotalCost().compareTo(BigDecimal.ZERO) > 0, "Cost should be greater than 0");
        assertTrue(validUser.getBalance().compareTo(BigDecimal.valueOf(50.0)) < 0, "User balance should be deducted");

        assertTrue(availableCar.getIsAvailable(), "Car should be available again");
        assertEquals(endLocation, availableCar.getLocation(), "Car location should be updated");

        verify(carService).saveCar(availableCar);
        verify(userService).saveUser(validUser);
    }
}