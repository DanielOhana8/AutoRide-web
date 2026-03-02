package com.autoride.dto.request;

import jakarta.validation.constraints.NotNull;

public record UpdateIsAvailableRequest(
        @NotNull(message = "isAvailable is required")
        Boolean isAvailable
) {}
