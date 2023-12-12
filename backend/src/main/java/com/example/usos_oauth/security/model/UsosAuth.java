package com.example.usos_oauth.security.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity class representing user authentication information for USOS (University's Single Sign-On) integration.
 */
@Data
@Entity
@Builder
@Table(name = "usos_auth")
@NoArgsConstructor
@AllArgsConstructor
public class UsosAuth {

    /**
     * Primary key identifier for the USOS authentication entity.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "usos_auth_seq")
    @SequenceGenerator(name = "usos_auth_seq", allocationSize = 1)
    private long usosId;
    /**
     * OAuth key associated with the USOS authentication.
     */
    private String oauthKey;
    /**
     * OAuth secret associated with the USOS authentication.
     */
    private String oauthSecret;
}
