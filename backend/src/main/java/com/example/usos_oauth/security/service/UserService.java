package com.example.usos_oauth.security.service;

import com.example.usos_oauth.security.auth.model.UserDataResponse;
import com.example.usos_oauth.security.auth.service.UnknownAvatarException;
import com.example.usos_oauth.security.model.Avatar;
import com.example.usos_oauth.security.model.User;
import com.example.usos_oauth.security.model.UsosAuth;
import com.example.usos_oauth.security.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.social.oauth1.OAuthToken;
import org.springframework.stereotype.Service;

/**
 * Service class responsible for handling user-related operations and interactions with the UserRepository.
 */
@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    /**
     * JPA repository for managing User entities.
     */
    UserRepository userRepository;

    /**
     * Service for handling JWT-related operations.
     */
    JwtService jwtService;

    /**
     * Retrieves the currently authenticated user from the security context.
     *
     * @return The currently authenticated User.
     */
    public User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    /**
     * Loads a user by their unique identifier (ID).
     *
     * @param userId The unique identifier of the user.
     * @return The User entity corresponding to the given ID.
     * @throws UsernameNotFoundException If the user with the specified ID is not found.
     */
    public User loadUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    /**
     * Loads a user by their username.
     *
     * @param username The username of the user.
     * @return The User entity corresponding to the given username.
     * @throws UsernameNotFoundException If the user with the specified username is not found.
     */
    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    /**
     * Retrieves the OAuthToken associated with a user.
     *
     * @param userId The unique identifier of the user.
     * @return The OAuthToken associated with the user.
     */
    public OAuthToken getUserToken(Long userId) {
        User user = loadUserById(userId);
        return new OAuthToken(user.getUsos_auth().getOauthKey(), user.getUsos_auth().getOauthSecret());
    }

    /**
     * Retrieves the OAuthToken for the currently authenticated user.
     *
     * @return The OAuthToken for the currently authenticated user.
     */
    public OAuthToken getCurrentUserToken() {
        User currentUser = getCurrentUser();
        return getUserToken(currentUser.getId());
    }

    /**
     * Updates the OAuthToken for a specific user.
     *
     * @param userId The unique identifier of the user.
     * @param token  The new OAuthToken to be associated with the user.
     */
    public void updateUserToken(Long userId, OAuthToken token) {
        User user = userRepository.getReferenceById(userId);
        UsosAuth usosAuth = new UsosAuth();
        usosAuth.setOauthKey(token.getValue());
        usosAuth.setOauthSecret(token.getSecret());
        user.setUsos_auth(usosAuth);
        userRepository.save(user);
    }

    /**
     * Checks if a given username is already taken by another user.
     *
     * @param username The username to be checked.
     * @return True if the username is already taken, false otherwise.
     */
    public boolean isUsernameTaken(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    /**
     * Updates the username for a specific user.
     *
     * @param userId   The unique identifier of the user.
     * @param username The new username to be associated with the user.
     */
    public void updateUserUsername(Long userId, String username) {
        User user = userRepository.getReferenceById(userId);
        user.setUsername(username);
        userRepository.save(user);
    }

    /**
     * Checks if a given avatar is valid.
     *
     * @param newAvatar The avatar to be checked.
     * @return True if the avatar is valid, false otherwise.
     */
    public boolean checkAvatar(String newAvatar){
        for (Avatar avatar : Avatar.values()) {
            if (avatar.getAvatar().equals(newAvatar))
                return true;
        }
        return false;
    }

    /**
     * Changes the avatar for the currently authenticated user.
     *
     * @param newAvatar The new avatar to be set for the user.
     * @throws UnknownAvatarException If the provided avatar is not recognized.
     */
    public void changeAvatar(String newAvatar) {
        User user = getCurrentUser();
        if (checkAvatar(newAvatar)) {
            user.setAvatar(newAvatar);
            userRepository.save(user);
        } else {
            throw new UnknownAvatarException();
        }
    }

    /**
     * Retrieves user information for the currently authenticated user.
     *
     * @return UserDataResponse containing information such as username and avatar.
     */
    public UserDataResponse getUserInfo() {
        User user = getCurrentUser();
        return UserDataResponse.builder()
                .username(user.getUsername())
                .avatar(user.getAvatar())
                .build();
    }
}
