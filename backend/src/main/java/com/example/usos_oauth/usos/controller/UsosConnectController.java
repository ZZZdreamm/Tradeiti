package com.example.usos_oauth.usos.controller;

import com.example.usos_oauth.usos.service.connect.UsosConnectService;
import com.example.usos_oauth.usos.service.connect.UsosServiceAuthorizer;
import com.example.usos_oauth.usos.service.usos.UsosService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/usos")
@Tag(name = "Managing connection with USOS")
public class UsosConnectController {

    private final UsosConnectService usosConnectService;
    private final UsosServiceAuthorizer usosServiceAuthorizer;

    @Value("${app.url.frontend}")
    private String frontendUrl;

    @GetMapping("/connect")
    public String getAuthorizationUrl() {
        return usosConnectService.getAuthorizationUrl();
    }

    @Hidden
    @GetMapping("/authorize-token")
    public RedirectView getAccessToken(@RequestParam("oauth_verifier") String oauthVerifier,
                                       @RequestParam("user_id") Long userId) {
        usosConnectService.verifyUserToken(oauthVerifier, userId);
        return new RedirectView(frontendUrl, true, true);
    }

    @GetMapping("/check-connection")
    public ResponseEntity<String> checkConnection() {
        UsosService usos = usosServiceAuthorizer.getUsosService();
        if (usos.isUserConnected()) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.PROXY_AUTHENTICATION_REQUIRED);
        }
    }
}
