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

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

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
