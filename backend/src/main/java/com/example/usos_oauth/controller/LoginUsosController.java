package com.example.usos_oauth.controller;

import com.example.usos_oauth.security.model.User;
import com.example.usos_oauth.security.service.UserService;
import com.example.usos_oauth.usos.api.Usos;
import com.example.usos_oauth.usos.connect.UsosServiceProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.social.oauth1.AuthorizedRequestToken;
import org.springframework.social.oauth1.OAuth1Operations;
import org.springframework.social.oauth1.OAuthToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
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
        OAuthToken token = operations.fetchRequestToken(url, null);
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
        try {
            OAuthToken token = userService.getCurrentUserToken();
            Usos api = usosServiceProvider.getApi(token);
            api.getUser();
            return ResponseEntity.ok("200 OK");
        } catch (HttpClientErrorException.Unauthorized e) {
            return ResponseEntity.status(HttpStatus.PROXY_AUTHENTICATION_REQUIRED).body("Token has expired");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }
}
