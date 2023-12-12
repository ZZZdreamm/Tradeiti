package com.example.usos_oauth.security.auth.controller;

import com.example.usos_oauth.security.auth.model.AuthenticationResponse;
import com.example.usos_oauth.security.auth.model.AvatarRequest;
import com.example.usos_oauth.security.auth.model.UserDataResponse;
import com.example.usos_oauth.security.auth.model.UsernameRequest;
import com.example.usos_oauth.security.auth.service.AuthenticationService;
import com.example.usos_oauth.security.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
@Tag(name = "Managing user info")
public class UserController {

    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("/change-username")
    public ResponseEntity<AuthenticationResponse> changeUsername(@RequestBody UsernameRequest usernameRequest) {
        String newUsername = usernameRequest.getUsername();
        return ResponseEntity.ok(authenticationService.changeUsername(newUsername));
    }
    @PostMapping("/change-avatar")
    public ResponseEntity<String> changeAvatar(@RequestBody AvatarRequest avatarRequest) {
        String newAvatar = avatarRequest.getAvatar();
        userService.changeAvatar(newAvatar);
        return ResponseEntity.ok("Avatar changed");
    }

    @GetMapping("/get-user-info")
    public ResponseEntity<UserDataResponse> getUserInfo() {
        return ResponseEntity.ok(userService.getUserInfo());
    }
}
