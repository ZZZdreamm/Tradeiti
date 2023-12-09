package com.example.usos_oauth.security.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@Table(name = "usos_auth")
@NoArgsConstructor
@AllArgsConstructor
public class UsosAuth {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "usos_auth_seq")
    @SequenceGenerator(name = "usos_auth_seq", allocationSize = 1)
    private long usosId;
    private String oauthKey;
    private String oauthSecret;
}
