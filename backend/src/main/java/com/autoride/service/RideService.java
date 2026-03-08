package com.autoride.service;

import com.autoride.entity.Car;
import com.autoride.entity.Location;
import com.autoride.entity.Ride;
import com.autoride.entity.User;
import com.autoride.repository.RideRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RideService {

    private final RideRepository rideRepository;
    private final UserService userService;
    private final CarService carService;

    @Transactional
    public Ride startRide(Long userId) {
        if (rideRepository.findByUser_IdAndEndTimeIsNull(userId).isPresent())
            throw new IllegalStateException("User already in an active ride");

        User user = userService.getUserById(userId);

        if (user.getLocation() == null)
            throw new IllegalStateException("User location is unknown");


        if (user.getBalance().compareTo(BigDecimal.ZERO) <= 0)
            throw new IllegalStateException("Non-positive balance");

        Car car = carService.findClosestAvailableCar(user.getLocation());
        Ride ride = Ride.builder().user(user).car(car).startTime(LocalDateTime.now())
                .startLocation(user.getLocation()).build();

        car.setIsAvailable(false);
        carService.saveCar(car);

        return rideRepository.save(ride);
    }

    @Transactional
    public Ride endRide(Long userId, Location endLocation) {
        Ride ride = getUserActiveRide(userId);
        Car car = ride.getCar();
        User user = ride.getUser();

        BigDecimal totalCost = car.getPricePerKm().multiply(BigDecimal.valueOf(
                ride.getStartLocation().distanceTo(endLocation)));

        user.setBalance(user.getBalance().subtract(totalCost));
        user.setLocation(endLocation);
        userService.saveUser(user);

        car.setIsAvailable(true);
        car.setLocation(endLocation);
        carService.saveCar(car);

        ride.setEndTime(LocalDateTime.now());
        ride.setEndLocation(endLocation);
        ride.setTotalCost(totalCost);

        return rideRepository.save(ride);
    }

    @Transactional(readOnly = true)
    public List<Ride> getRidesHistory() {
        return rideRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Ride> getAllActiveRides() {
        return rideRepository.findByEndTimeIsNull();
    }

    @Transactional(readOnly = true)
    public Ride getUserActiveRide(Long userId) {
        return rideRepository.findByUser_IdAndEndTimeIsNull(userId).orElseThrow(() ->
                new EntityNotFoundException("Not in active ride"));
    }

    @Transactional(readOnly = true)
    public List<Ride> getUserRideHistory(Long userId) {
        return rideRepository.findByUser_Id(userId);
    }

    @Transactional(readOnly = true)
    public Ride getCarActiveRide(Long carId) {
        return rideRepository.findByCar_IdAndEndTimeIsNull(carId).orElseThrow(() ->
                new EntityNotFoundException("Not in active ride"));
    }

    @Transactional(readOnly = true)
    public List<Ride> getCarRideHistory(Long carId) {
        return rideRepository.findByCar_Id(carId);
    }
}
