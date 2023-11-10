package com.example.usos_oauth.usos.connect;

import com.example.usos_oauth.usos.api.Usos;
import org.springframework.social.connect.support.OAuth1ConnectionFactory;


public class UsosConnectionFactory extends OAuth1ConnectionFactory<Usos> {
    public UsosConnectionFactory(String consumerKey, String consumerSecret) {
        super("usos", new UsosServiceProvider(consumerKey, consumerSecret), new UsosAdapter());
    }
}
