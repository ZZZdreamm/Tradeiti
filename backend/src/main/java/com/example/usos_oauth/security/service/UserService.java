package com.example.usos_oauth.security.service;

import com.example.usos_oauth.security.model.User;
import com.example.usos_oauth.security.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.social.oauth1.OAuthToken;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
@AllArgsConstructor
public class UserService {

    UserRepository userRepository;

    public User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public User getUserById(Long userId) {
        return userRepository.getReferenceById(userId);
    }

    public UserDetails getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public OAuthToken getUserToken(Long userId) {
        User user = userRepository.getReferenceById(userId);
        return new OAuthToken(user.getAuthentication_key(), user.getAuthentication_secret());
    }

    public OAuthToken getCurrentUserToken() {
        User currentUser = getCurrentUser();
        return getUserToken(currentUser.getId());
    }

    public void updateUserToken(Long userId, OAuthToken token) {
        User user = userRepository.getReferenceById(userId);
        user.setAuthentication_key(token.getValue());
        user.setAuthentication_secret(token.getSecret());
        userRepository.save(user);
    }
}
