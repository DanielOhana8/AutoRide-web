package com.autoride.controller;

import com.autoride.dto.request.UpdateBalanceRequest;
import com.autoride.dto.request.UpdateLocationRequest;
import com.autoride.dto.response.UserResponse;
import com.autoride.entity.Location;
import com.autoride.entity.User;
import com.autoride.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMyUser(Principal principal) {
        User user = userService.getUserByEmail(principal.getName());

        return ResponseEntity.ok(mapToUserResponse(user));
    }

    @PatchMapping("/balance")
    public ResponseEntity<UserResponse> updateBalance(Principal principal,
            @Valid @RequestBody UpdateBalanceRequest updateBalanceRequest) {
        User user = userService.getUserByEmail(principal.getName());
        user = userService.updateUserBalance(user.getId(), updateBalanceRequest.amount());

        return ResponseEntity.ok(mapToUserResponse(user));
    }

    @PatchMapping("/location")
    public ResponseEntity<UserResponse> updateLocation(Principal principal,
            @Valid @RequestBody UpdateLocationRequest updateLocationRequest) {
        User user = userService.getUserByEmail(principal.getName());
        Location location = Location.builder().latitude(updateLocationRequest.latitude())
                .longitude(updateLocationRequest.longitude()).build();
        user = userService.updateUserLocation(user.getId(), location);

        return ResponseEntity.ok(mapToUserResponse(user));
    }

    private UserResponse mapToUserResponse(User user) {
        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getBalance());
    }
}
