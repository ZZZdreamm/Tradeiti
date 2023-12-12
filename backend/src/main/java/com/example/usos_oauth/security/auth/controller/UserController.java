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

    /**
     * Service responsible for handling authentication-related operations.
     */
    private final AuthenticationService authenticationService;

    /**
     * Service responsible for handling user-related operations.
     */
    private final UserService userService;

    /**
     * Changes the username for the authenticated user.
     *
     * @param usernameRequest The request object containing the new username.
     * @return ResponseEntity containing an AuthenticationResponse indicating the success of the operation.
     */
    @PostMapping("/change-username")
    public ResponseEntity<AuthenticationResponse> changeUsername(@RequestBody UsernameRequest usernameRequest) {
        String newUsername = usernameRequest.getUsername();
        return ResponseEntity.ok(authenticationService.changeUsername(newUsername));
    }

    /**
     * Changes the avatar for the authenticated user.
     *
     * @param avatarRequest The request object containing the new avatar information.
     * @return ResponseEntity containing a success message upon changing the avatar.
     */
    @PostMapping("/change-avatar")
    public ResponseEntity<String> changeAvatar(@RequestBody AvatarRequest avatarRequest) {
        String newAvatar = avatarRequest.getAvatar();
        userService.changeAvatar(newAvatar);
        return ResponseEntity.ok("Avatar changed");
    }

    /**
     * Retrieves information about the authenticated user.
     *
     * @return ResponseEntity containing a UserDataResponse with information about the user.
     */
    @GetMapping("/get-user-info")
    public ResponseEntity<UserDataResponse> getUserInfo() {
        return ResponseEntity.ok(userService.getUserInfo());
    }
}
