package com.autoride.dto.response;

import java.time.LocalDateTime;

public record RideResponse(
        Long id,
        Long userId,
        Long carId,
        Integer startLocationX,
        Integer startLocationY,
        Integer endLocationX,
        Integer endLocationY,
        LocalDateTime startTime,
        LocalDateTime endTime,
        Double price
) {}
