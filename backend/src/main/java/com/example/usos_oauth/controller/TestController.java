package com.example.usos_oauth.controller;

import com.example.usos_oauth.model.CustomRequestToken;
import com.example.usos_oauth.repository.CustomRequestTokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.social.oauth1.AuthorizedRequestToken;
import org.springframework.social.oauth1.OAuth1Template;
import org.springframework.social.oauth1.OAuthToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;


@AllArgsConstructor
@RestController
@RequestMapping("/api/oauth")
public class TestController {

    private OAuth1Template oAuth1Template;
    private CustomRequestTokenRepository customRequestTokenRepository;

    @GetMapping("/request-token")
    public String getRequestToken(){
        OAuthToken token = oAuth1Template.fetchRequestToken("https://www.arcziweb.com/api/oauth/access-token", null);
        customRequestTokenRepository.save(new CustomRequestToken(null, token.getValue(), token.getSecret()));
        return oAuth1Template.buildAuthorizeUrl(token.getValue(), null);
    }

    @GetMapping("/tokens")
    List<CustomRequestToken> getTokens() {
      return customRequestTokenRepository.findAll();
    }

    @GetMapping("/access-token")
    public RedirectView getAccessToken(@RequestParam("oauth_token") String oauthToken,
                                 @RequestParam("oauth_verifier") String oauthVerifier) {
      CustomRequestToken tokenDAO = customRequestTokenRepository.findCustomRequestTokenByRequestToken(oauthToken).get();
      OAuthToken token = new OAuthToken(tokenDAO.getRequestToken(), tokenDAO.getRequestTokenSecret());
      AuthorizedRequestToken authorizedRequestToken = new AuthorizedRequestToken(token, oauthVerifier);
      OAuthToken accessToken = oAuth1Template.exchangeForAccessToken(authorizedRequestToken, null);
      String params = "token=" + accessToken.getValue() + "&secret=" + accessToken.getSecret();
      String baseFrontendUrl = "https://www.arcziweb.com/#/redirect";
      String url = baseFrontendUrl + "?" + params;
      return new RedirectView(url, true, true);
    }
}
