package com.autoride.service;

import com.autoride.entity.Car;
import com.autoride.entity.Location;
import com.autoride.repository.CarRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CarService {

    private final CarRepository carRepository;

    @Transactional(readOnly = true)
    public Car findClosestAvailableCar(Location userLocation) {
        return carRepository.findByIsAvailableTrue().stream()
                .min(Comparator.comparingDouble(car -> userLocation.distanceTo(car.getLocation())))
                .orElseThrow(() -> new EntityNotFoundException("No available cars found"));
    }

    @Transactional(readOnly = true)
    public Car getCarById(Long id) {
        return carRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Car not exists"));
    }

    @Transactional
    public Car updateCarAvailable(Long id, Boolean isAvailable) {
        Car car = getCarById(id);
        car.setIsAvailable(isAvailable);
        return carRepository.save(car);
    }

    @Transactional
    public Car updateCarLocation(Long id, Location location) {
        Car car = getCarById(id);
        car.setLocation(location);
        return carRepository.save(car);
    }

    @Transactional(readOnly = true)
    public List<Car> getAllAvailableCars() {
        return carRepository.findByIsAvailableTrue();
    }

    @Transactional
    public void saveCar(Car car) {
        carRepository.save(car);
    }
}
