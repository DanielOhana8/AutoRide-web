package com.autoride.dto.response;

public record CarResponse(
        Long id,
        String model,
        Double latitude,
        Double longitude,
        Boolean isAvailable
) {}
