package com.example.usos_oauth.security.auth.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO (Data Transfer Object) class representing user data in a response.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDataResponse {
    /**
     * The username associated with the user data.
     */
    private String username;

    /**
     * The avatar associated with the user data.
     */
    private String avatar;
}
