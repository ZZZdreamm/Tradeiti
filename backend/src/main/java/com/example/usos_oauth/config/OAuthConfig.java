package com.example.usos_oauth.config;

import com.example.usos_oauth.usos.connect.UsosConnectionFactory;
import com.example.usos_oauth.usos.connect.UsosServiceProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.social.connect.ConnectionFactoryLocator;
import org.springframework.social.connect.support.ConnectionFactoryRegistry;
import org.springframework.social.oauth1.OAuth1Template;

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

    @Bean
    ConnectionFactoryLocator connectionFactoryLocator() {
        ConnectionFactoryRegistry registry = new ConnectionFactoryRegistry();
        registry.addConnectionFactory(new UsosConnectionFactory(consumerKey, consumerSecret));
        return registry;
    }

    @Bean
    OAuth1Template oAuth1Template() {
        return new OAuth1Template(consumerKey, consumerSecret,
                "https://apps.usos.pw.edu.pl/services/oauth/request_token",
                "https://apps.usos.pw.edu.pl/services/oauth/authorize",
                "https://apps.usos.pw.edu.pl/services/oauth/access_token");
    }
}
