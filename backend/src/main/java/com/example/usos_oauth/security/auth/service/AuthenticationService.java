package com.example.usos_oauth.security.auth.service;

import com.example.usos_oauth.security.auth.model.AuthenticationRequest;
import com.example.usos_oauth.security.auth.model.AuthenticationResponse;
import com.example.usos_oauth.security.model.Role;
import com.example.usos_oauth.security.model.User;
import com.example.usos_oauth.security.model.UsosAuth;
import com.example.usos_oauth.security.repository.UserRepository;
import com.example.usos_oauth.security.service.JwtService;
import com.example.usos_oauth.security.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service class responsible for authentication-related operations such as registration, login, and username changes.
 */
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    /**
     * Repository for managing User entities.
     */
    private final UserRepository userRepository;

    /**
     * Service for handling user-related operations.
     */
    private final UserService userService;

    /**
     * Password encoder for encrypting and verifying passwords.
     */
    private final PasswordEncoder passwordEncoder;

    /**
     * Service for handling JWT-related operations.
     */
    private final JwtService jwtService;

    /**
     * Authentication manager for user authentication.
     */
    private final AuthenticationManager authenticationManager;

    /**
     * Registers a new user with the provided registration request.
     *
     * @param registerRequest The request object containing registration information.
     * @return AuthenticationResponse containing the JWT token for the registered user.
     */
    public AuthenticationResponse register(AuthenticationRequest registerRequest) {
        String username = registerRequest.getUsername();
        if (userRepository.findByUsername(username).isPresent()) {
            throw new UserAlreadyExistsException();
        }
        User user = User.builder()
                .username(username)
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.USER)
                .usos_auth(UsosAuth.builder()
                        .oauthKey("none")
                        .oauthSecret("none")
                        .build())
                .avatar("helicopter")
                .build();
        userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    /**
     * Authenticates a user with the provided login request.
     *
     * @param loginRequest The request object containing login credentials.
     * @return AuthenticationResponse containing the JWT token for the authenticated user.
     */
    public AuthenticationResponse login(AuthenticationRequest loginRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    /**
     * Changes the username for the currently authenticated user.
     *
     * @param newUsername The new username to be set for the user.
     * @return AuthenticationResponse containing the JWT token for the user with the new username.
     */
    public AuthenticationResponse changeUsername(String newUsername) {
        if (userService.isUsernameTaken(newUsername)) {
            throw new UserAlreadyExistsException();
        }
        User user = userService.getCurrentUser();
        userService.updateUserUsername(user.getId(), newUsername);
        String jwtToken = jwtService.generateToken(userRepository.findByUsername(newUsername).get());
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
