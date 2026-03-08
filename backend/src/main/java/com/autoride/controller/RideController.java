package com.autoride.controller;

import com.autoride.dto.request.EndRideRequest;
import com.autoride.dto.response.RideResponse;
import com.autoride.entity.Location;
import com.autoride.entity.Ride;
import com.autoride.entity.User;
import com.autoride.service.RideService;
import com.autoride.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/rides")
@RequiredArgsConstructor
public class RideController {

    private final RideService rideService;
    private final UserService userService;

    @PostMapping("/start")
    public ResponseEntity<RideResponse> startRide(Principal principal) {
        User user = userService.getUserByEmail(principal.getName());
        Ride ride = rideService.startRide(user.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(mapToRideResponse(ride));
    }

    @PatchMapping("/end")
    public ResponseEntity<RideResponse> endRide(Principal principal, @Valid @RequestBody EndRideRequest endRideRequest) {
        User user = userService.getUserByEmail(principal.getName());
        Location endLocation = Location.builder().latitude(endRideRequest.latitude())
                .longitude(endRideRequest.longitude()).build();
        Ride ride = rideService.endRide(user.getId(), endLocation);

        return ResponseEntity.ok(mapToRideResponse(ride));
    }

    @GetMapping
    public ResponseEntity<List<RideResponse>> getRidesHistory() {
        List<Ride> rides = rideService.getRidesHistory();

        List<RideResponse> rideResponseList = rides.stream().map(this::mapToRideResponse).toList();

        return ResponseEntity.ok(rideResponseList);
    }

    @GetMapping("/active")
    public ResponseEntity<List<RideResponse>> getAllActiveRides() {
        List<Ride> rides = rideService.getAllActiveRides();

        List<RideResponse> rideResponseList = rides.stream().map(this::mapToRideResponse).toList();

        return ResponseEntity.ok(rideResponseList);
    }

    @GetMapping("/user")
    public ResponseEntity<List<RideResponse>> getUserRidesHistory(Principal principal) {
        User user = userService.getUserByEmail(principal.getName());
        List<Ride> rides = rideService.getUserRideHistory(user.getId());

        List<RideResponse> rideResponseList = rides.stream().map(this::mapToRideResponse).toList();

        return ResponseEntity.ok(rideResponseList);
    }

    @GetMapping("/user/active")
    public ResponseEntity<RideResponse> getUserActiveRide(Principal principal) {
        User user = userService.getUserByEmail(principal.getName());
        Ride ride = rideService.getUserActiveRide(user.getId());

        return ResponseEntity.ok(mapToRideResponse(ride));
    }

    @GetMapping("/car/{carId}")
    public ResponseEntity<List<RideResponse>> getCarRidesHistory(@PathVariable Long carId) {
        List<Ride> rides = rideService.getCarRideHistory(carId);

        List<RideResponse> rideResponseList = rides.stream().map(this::mapToRideResponse).toList();

        return ResponseEntity.ok(rideResponseList);
    }

    @GetMapping("/car/{carId}/active")
    public ResponseEntity<RideResponse> getCarActiveRide(@PathVariable Long carId) {
        Ride ride = rideService.getCarActiveRide(carId);

        return ResponseEntity.ok(mapToRideResponse(ride));
    }

    private RideResponse mapToRideResponse(Ride ride) {
        return new RideResponse(ride.getId(), ride.getUser().getId(), ride.getCar().getId(),
                ride.getStartLocation().getLatitude(), ride.getStartLocation().getLongitude(),
                ride.getEndLocation() == null ? null : ride.getEndLocation().getLatitude(),
                ride.getEndLocation() == null ? null : ride.getEndLocation().getLongitude(),
                ride.getStartTime(), ride.getEndTime(), ride.getTotalCost());
    }
}
