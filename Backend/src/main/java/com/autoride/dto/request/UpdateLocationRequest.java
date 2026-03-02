package com.autoride.dto.request;

import jakarta.validation.constraints.NotNull;

public record UpdateLocationRequest(
        @NotNull(message = "X coordinate is required")
        Integer x,

        @NotNull(message = "Y coordinate is required")
        Integer y
) {}