package com.example.usos_oauth.usos.service.connect;

import com.example.usos_oauth.security.model.User;
import com.example.usos_oauth.security.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.social.oauth1.AuthorizedRequestToken;
import org.springframework.social.oauth1.OAuth1Operations;
import org.springframework.social.oauth1.OAuth1Parameters;
import org.springframework.social.oauth1.OAuthToken;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UsosConnectService {

    private final UsosServiceProvider usosServiceProvider;
    private final UserService userService;

    @Value("${app.url.backend}")
    private String backendUrl;

    public String getAuthorizationUrl() {
        OAuth1Operations operations = usosServiceProvider.getOAuthOperations();
        User currentUser = userService.getCurrentUser();
        String url = getRedirectUrl(currentUser);
        HttpHeaders params = new HttpHeaders();
        params.add("scopes", "studies");
        OAuthToken token = operations.fetchRequestToken(url, params);
        userService.updateUserToken(currentUser.getId(), token);
        return operations.buildAuthorizeUrl(token.getValue(), OAuth1Parameters.NONE);
    }

    public void verifyUserToken(String oauthVerifier, Long userId) {
        OAuth1Operations operations = usosServiceProvider.getOAuthOperations();
        OAuthToken unauthorizedToken = userService.getUserToken(userId);
        AuthorizedRequestToken authorizedRequestToken = new AuthorizedRequestToken(unauthorizedToken, oauthVerifier);
        OAuthToken accessToken = operations.exchangeForAccessToken(authorizedRequestToken, null);
        userService.updateUserToken(userId, accessToken);
    }

    private String getRedirectUrl(User currentUser) {
        return backendUrl + "/api/usos/authorize-token?user_id=" + currentUser.getId();
    }
}
