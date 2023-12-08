package com.example.usos_oauth.usos.config;

import com.example.usos_oauth.usos.service.connect.UsosServiceProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OAuthConfig {

    @Value("${usos.consumer.key}")
    private String consumerKey;
    @Value("${usos.consumer.secret}")
    private String consumerSecret;

    @Bean
    public UsosServiceProvider usosServiceProvider() {
        return new UsosServiceProvider(consumerKey, consumerSecret);
    }
}
