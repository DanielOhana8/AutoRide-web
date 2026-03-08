package com.autoride.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record RideResponse(
        Long id,
        Long userId,
        Long carId,
        Double startLatitude,
        Double startLongitude,
        Double endLatitude,
        Double endLongitude,
        LocalDateTime startTime,
        LocalDateTime endTime,
        BigDecimal price
) {}
