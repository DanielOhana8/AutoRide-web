package com.autoride.dto.response;

public record UserResponse(
        Long id,
        String name,
        String email,
        Double balance
) {}
