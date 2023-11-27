package com.example.usos_oauth.usos.connect;

import com.example.usos_oauth.usos.api.UsosTemplate;
import com.example.usos_oauth.usos.service.UsosService;
import org.springframework.social.oauth1.AbstractOAuth1ServiceProvider;
import org.springframework.social.oauth1.OAuth1Template;
import org.springframework.social.oauth1.OAuthToken;

public class UsosServiceProvider extends AbstractOAuth1ServiceProvider<UsosTemplate> {

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
    public UsosTemplate getApi(String accessToken, String secret) {
        return new UsosTemplate(getConsumerKey(), getConsumerSecret(), accessToken, secret);
    }

    public UsosTemplate getApi(OAuthToken token) {
        return getApi(token.getValue(), token.getSecret());
    }

    public UsosService getUsosService(OAuthToken token) {
        return new UsosService(getApi(token));
    }
}
