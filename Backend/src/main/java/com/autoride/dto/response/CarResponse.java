package com.autoride.dto.response;

public record CarResponse(
        Long id,
        String model,
        Integer x,
        Integer y,
        Boolean isAvailable
) {}
