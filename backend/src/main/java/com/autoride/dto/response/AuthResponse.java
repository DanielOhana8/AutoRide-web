package com.autoride.dto.response;

public record AuthResponse(
        String token,
        UserResponse user
) {}