package com.example.usos_oauth.security.auth.controller;

import com.example.usos_oauth.security.auth.model.AuthenticationRequest;
import com.example.usos_oauth.security.auth.model.AuthenticationResponse;
import com.example.usos_oauth.security.auth.service.AuthenticationService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody AuthenticationRequest registerRequest
    ) {
        return ResponseEntity.ok(authenticationService.register(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody AuthenticationRequest loginRequest
    ) {
        return ResponseEntity.ok(authenticationService.login(loginRequest));
    }

    @GetMapping("/test-token")
    public ResponseEntity<String> testToken() {
        return ResponseEntity.ok("Token is valid");
    }
}
