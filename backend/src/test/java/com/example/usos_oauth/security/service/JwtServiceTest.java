package com.example.usos_oauth.security.service;

import io.jsonwebtoken.ExpiredJwtException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;

class JwtServiceTest {

    private final JwtService jwtService = new JwtService();

    @Test
    void generateToken_ValidUserDetails_ReturnsToken() {
        // Given
        UserDetails userDetails = User.withUsername("testUser").password("password").roles("USER").build();

        // When
        String token = jwtService.generateToken(userDetails);

        // Then
        Assertions.assertNotNull(token);
    }

    @Test
    void generateToken_WithExtraClaims_ReturnsTokenWithClaims() {
        // Given
        UserDetails userDetails = User.withUsername("testUser").password("password").roles("USER").build();
        Map<String, Object> extraClaims = Map.of("customClaim", "customValue");

        // When
        String token = jwtService.generateToken(extraClaims, userDetails);

        // Then
        Assertions.assertNotNull(token);
        // Add more assertions based on your requirements, e.g., check if the custom claim is present in the token

    }

    @Test
    void extractUsername_ValidToken_ReturnsUsername() {
        // Given
        String token = jwtService.generateToken(User.withUsername("testUser").password("password").roles("USER").build());

        // When
        String username = jwtService.extractUsername(token);

        // Then
        Assertions.assertEquals("testUser", username);
    }

    @Test
    void isTokenValid_ValidTokenAndUserDetails_ReturnsTrue() {
        // Given
        UserDetails userDetails = User.withUsername("testUser").password("password").roles("USER").build();
        String token = jwtService.generateToken(userDetails);

        // When
        boolean isValid = jwtService.isTokenValid(token, userDetails);

        // Then
        Assertions.assertTrue(isValid);
    }

    @Test
    void isTokenValid_ExpiredToken_ReturnsFalse() {
        // Given
        UserDetails userDetails = User.withUsername("testUser").password("password").roles("USER").build();
        String expiredToken = jwtService.generateTokenWithExpiration(userDetails, -1000L);

        // When
        try {
            jwtService.isTokenValid(expiredToken, userDetails);
        } catch (ExpiredJwtException e) {
            // Then
            Assertions.assertEquals("JWT expired", e.getMessage().substring(0, 11));
        }
    }
}