package com.example.usos_oauth.security.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "usos_auth")
public class UsosAuth {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "usos_auth_seq")
    @SequenceGenerator(name = "usos_auth_seq", allocationSize = 1)
    private long usosId;
    private String oauthKey;
    private String oauthSecret;
}
