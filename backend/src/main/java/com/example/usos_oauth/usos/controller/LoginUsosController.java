package com.example.usos_oauth.usos.controller;

import com.example.usos_oauth.security.model.User;
import com.example.usos_oauth.security.service.UserService;
import com.example.usos_oauth.usos.connect.UsosServiceProvider;
import com.example.usos_oauth.usos.service.UsosService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.social.oauth1.AuthorizedRequestToken;
import org.springframework.social.oauth1.OAuth1Operations;
import org.springframework.social.oauth1.OAuthToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/usos")
public class LoginUsosController {

    private final UsosServiceProvider usosServiceProvider;
    private final UserService userService;

    @Value("${app.url.backend}")
    private String backendUrl;
    @Value("${app.url.frontend}")
    private String frontendUrl;

    @GetMapping("/connect")
    public String getRequestToken(){
        OAuth1Operations operations = usosServiceProvider.getOAuthOperations();
        User currentUser = userService.getCurrentUser();
        String url = backendUrl + "/api/usos/authorize-token?user_id=" + currentUser.getId();
        HttpHeaders params = new HttpHeaders();
        params.add("scopes", "studies");
        OAuthToken token = operations.fetchRequestToken(url, params);
        userService.updateUserToken(currentUser.getId(), token);
        return operations.buildAuthorizeUrl(token.getValue(), null);
    }

    @GetMapping("/authorize-token")
    public RedirectView getAccessToken(@RequestParam("oauth_verifier") String oauthVerifier,
                                       @RequestParam("user_id") Long userId) {
      OAuth1Operations operations = usosServiceProvider.getOAuthOperations();
      OAuthToken unauthorizedToken = userService.getUserToken(userId);
      AuthorizedRequestToken authorizedRequestToken = new AuthorizedRequestToken(unauthorizedToken, oauthVerifier);
      OAuthToken accessToken = operations.exchangeForAccessToken(authorizedRequestToken, null);
      userService.updateUserToken(userId, accessToken);
      return new RedirectView(frontendUrl, true, true);
    }

    @GetMapping("/check-connection")
    public ResponseEntity<String> checkConnection() {
        OAuthToken token = userService.getCurrentUserToken();
        UsosService usos = usosServiceProvider.getUsosService(token);
        if (usos.isUserConnected()) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.PROXY_AUTHENTICATION_REQUIRED);
        }
    }
}
