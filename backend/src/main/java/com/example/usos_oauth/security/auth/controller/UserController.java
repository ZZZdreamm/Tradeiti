package com.example.usos_oauth.security.auth.controller;

import com.example.usos_oauth.security.auth.model.AuthenticationResponse;
import com.example.usos_oauth.security.auth.service.AuthenticationService;
import com.example.usos_oauth.security.auth.model.UsernameRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final AuthenticationService authenticationService;

    @PostMapping("/change-username")
    public ResponseEntity<AuthenticationResponse> changeUsername(@RequestBody UsernameRequest usernameRequest) {
        String newUsername = usernameRequest.getUsername();
        return ResponseEntity.ok(authenticationService.changeUsername(newUsername));
    }
}
