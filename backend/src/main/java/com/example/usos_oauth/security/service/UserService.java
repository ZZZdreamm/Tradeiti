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

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    UserRepository userRepository;
    JwtService jwtService;

    public User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public User loadUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public OAuthToken getUserToken(Long userId) {
        User user = loadUserById(userId);
        return new OAuthToken(user.getUsos_auth().getOauthKey(), user.getUsos_auth().getOauthSecret());
    }

    public OAuthToken getCurrentUserToken() {
        User currentUser = getCurrentUser();
        return getUserToken(currentUser.getId());
    }

    public void updateUserToken(Long userId, OAuthToken token) {
        User user = userRepository.getReferenceById(userId);
        UsosAuth usosAuth = new UsosAuth();
        usosAuth.setOauthKey(token.getValue());
        usosAuth.setOauthSecret(token.getSecret());
        user.setUsos_auth(usosAuth);
        userRepository.save(user);
    }

    public boolean isUsernameTaken(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public void updateUserUsername(Long userId, String username) {
        User user = userRepository.getReferenceById(userId);
        user.setUsername(username);
        userRepository.save(user);
    }

    public boolean checkAvatar(String newAvatar){
        for (Avatar avatar : Avatar.values()) {
            if (avatar.getAvatar().equals(newAvatar))
                return true;
        }
        return false;
    }

    public void changeAvatar(String newAvatar) {
        User user = getCurrentUser();
        if (checkAvatar(newAvatar)) {
            user.setAvatar(newAvatar);
            userRepository.save(user);
        } else {
            throw new UnknownAvatarException();
        }
    }

    public UserDataResponse getUserInfo() {
        User user = getCurrentUser();
        return UserDataResponse.builder()
                .username(user.getUsername())
                .avatar(user.getAvatar())
                .build();
    }
}
