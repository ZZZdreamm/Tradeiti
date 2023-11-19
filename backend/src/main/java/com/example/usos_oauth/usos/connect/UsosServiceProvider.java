package com.example.usos_oauth.usos.connect;

import com.example.usos_oauth.usos.api.Usos;
import com.example.usos_oauth.usos.api.impl.UsosTemplate;
import org.springframework.social.oauth1.AbstractOAuth1ServiceProvider;
import org.springframework.social.oauth1.OAuth1Template;

public class UsosServiceProvider extends AbstractOAuth1ServiceProvider<Usos> {

    public UsosServiceProvider(String consumerKey, String consumerSecret) {
        super(consumerKey, consumerSecret, new OAuth1Template(
                consumerKey,
                consumerSecret,
                "https://apps.usos.pw.edu.pl/services/oauth/request_token",
                "https://apps.usos.pw.edu.pl/services/oauth/authorize",
                "https://apps.usos.pw.edu.pl/services/oauth/access_token"
        )
        );
    }

    @Override
    public Usos getApi(String accessToken, String secret) {
        return new UsosTemplate(getConsumerKey(), getConsumerSecret(), accessToken, secret);
    }
}
