package com.autoride.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record UpdateBalanceRequest(
        @NotNull(message = "Amount is required")
        @Positive(message = "Amount must be positive")
        Double amount
) {}
