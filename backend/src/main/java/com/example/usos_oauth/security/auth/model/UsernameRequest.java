package com.example.usos_oauth.security.auth.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO (Data Transfer Object) class representing a request to change the username.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsernameRequest {
    /**
     * The new username to be set.
     */
    private String username;
}
