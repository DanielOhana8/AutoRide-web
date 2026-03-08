package com.autoride.dto.response;

import java.math.BigDecimal;

public record UserResponse(
        Long id,
        String name,
        String email,
        BigDecimal balance
) {}
