package com.autoride.controller;

import com.autoride.dto.request.UpdateIsAvailableRequest;
import com.autoride.dto.request.UpdateLocationRequest;
import com.autoride.dto.response.CarResponse;
import com.autoride.dto.response.UserResponse;
import com.autoride.entity.Car;
import com.autoride.entity.Location;
import com.autoride.entity.User;
import com.autoride.service.CarService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
public class CarController {

    private final CarService carService;

    @GetMapping("/closest")
    public ResponseEntity<CarResponse> findClosestAvailableCar(@RequestParam Integer x, @RequestParam Integer y) {
        Location location = Location.builder().x(x).y(y).build();
        Car car = carService.findClosestAvailableCar(location);

        CarResponse carResponse = mapToCarResponse(car);

        return ResponseEntity.ok(carResponse);
    }

    @PatchMapping("/{id}/available")
    public ResponseEntity<CarResponse> updateCarAvailable(@PathVariable Long id,
            @Valid @RequestBody UpdateIsAvailableRequest updateIsAvailableRequest) {
        Car car = carService.updateCarAvailable(id , updateIsAvailableRequest.isAvailable());

        CarResponse carResponse = mapToCarResponse(car);

        return ResponseEntity.ok(carResponse);
    }

    @PatchMapping("/{id}/location")
    public ResponseEntity<CarResponse> updateCarLocation(@PathVariable Long id,
            @Valid @RequestBody UpdateLocationRequest updateLocationRequest) {
        Location location = Location.builder().x(updateLocationRequest.x()).y(updateLocationRequest.y()).build();
        Car car = carService.updateCarLocation(id , location);

        CarResponse carResponse = mapToCarResponse(car);

        return ResponseEntity.ok(carResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarResponse> getCarById(@PathVariable Long id) {
        Car car = carService.getCarById(id);
        return ResponseEntity.ok(mapToCarResponse(car));
    }

    private CarResponse mapToCarResponse(Car car) {
        return new CarResponse(car.getId(), car.getModel(), car.getLocation().getX(),
                car.getLocation().getY(), car.getIsAvailable());
    }
}
