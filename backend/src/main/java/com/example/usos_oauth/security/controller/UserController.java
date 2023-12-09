package com.example.usos_oauth.security.controller;

import com.example.usos_oauth.security.auth.model.AuthenticationResponse;
import com.example.usos_oauth.security.model.UsernameRequest;
import com.example.usos_oauth.security.service.UserService;
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

    private final UserService userService;

    @PostMapping("/change-username")
    public ResponseEntity<AuthenticationResponse> changeUsername(@RequestBody UsernameRequest usernameRequest) {
        String newUsername = usernameRequest.getUsername();
        return ResponseEntity.ok(userService.changeUsername(newUsername));
    }

}
