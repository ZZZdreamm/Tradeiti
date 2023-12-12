package com.example.usos_oauth.security.auth.controller;

import com.example.usos_oauth.security.auth.model.AuthenticationRequest;
import com.example.usos_oauth.security.auth.model.AuthenticationResponse;
import com.example.usos_oauth.security.auth.service.AuthenticationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class handling authentication operations such as registration and login.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Tag(name = "Authentication operations")
public class AuthenticationController {

    /**
     * Service responsible for handling authentication-related operations.
     */
    private final AuthenticationService authenticationService;

    /**
     * Handles HTTP POST requests for user registration.
     *
     * @param registerRequest The request object containing registration information.
     * @return ResponseEntity containing an AuthenticationResponse indicating the success of the registration.
     */
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody AuthenticationRequest registerRequest
    ) {
        return ResponseEntity.ok(authenticationService.register(registerRequest));
    }

    /**
     * Handles HTTP POST requests for user login.
     *
     * @param loginRequest The request object containing login credentials.
     * @return ResponseEntity containing an AuthenticationResponse indicating the success of the login.
     */
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody AuthenticationRequest loginRequest
    ) {
        return ResponseEntity.ok(authenticationService.login(loginRequest));
    }

    /**
     * Handles HTTP GET requests to test the validity of the authentication token.
     *
     * @return ResponseEntity with a success message indicating that the token is valid.
     */
    @GetMapping("/test-token")
    public ResponseEntity<String> testToken() {
        return ResponseEntity.ok("Token is valid");
    }
}
