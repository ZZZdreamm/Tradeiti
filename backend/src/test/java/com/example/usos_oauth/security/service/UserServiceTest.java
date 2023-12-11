package com.example.usos_oauth.security.service;

import com.example.usos_oauth.security.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    private UserService userService;
    private JwtService jwtService;
    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userService = new UserService(userRepository, jwtService);
    }

    @Test
    void loadUserById() {

    }

    @Test
    void loadUserByUsername() {
    }

    @Test
    void getUserToken() {
    }

    @Test
    void updateUserToken() {
    }

    @Test
    void isUsernameTaken() {
    }

    @Test
    void updateUserUsername() {
    }

    @Test
    void checkAvatar() {
    }

    @Test
    void changeAvatar() {
    }

    @Test
    void getUserInfo() {
    }
}