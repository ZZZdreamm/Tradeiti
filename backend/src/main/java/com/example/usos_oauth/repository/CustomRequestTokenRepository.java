package com.example.usos_oauth.repository;

import com.example.usos_oauth.model.CustomRequestToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomRequestTokenRepository
        extends JpaRepository<CustomRequestToken, Integer> {

    Optional<CustomRequestToken> findCustomRequestTokenByRequestToken(String requestToken);
}
