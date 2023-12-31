package com.example.usos_oauth.security.service;

import com.example.usos_oauth.security.model.Role;
import com.example.usos_oauth.security.model.User;
import com.example.usos_oauth.security.model.UsosAuth;
import com.example.usos_oauth.security.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.social.oauth1.OAuthToken;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @InjectMocks
    private UserService userService;
    @Mock
    private JwtService jwtService;
    @Mock
    private UserRepository userRepository;
    private User mockUser;
    private SecurityContext securityContext;
    private Authentication authentication;

    @BeforeEach
    void setUp() {
        userService = new UserService(userRepository, jwtService);
        mockUser = new User();
        mockUser.setId(10L);
        mockUser.setUsername("mockUser");
        mockUser.setPassword("mockPassword");
        mockUser.setRole(Role.ADMIN);
        mockUser.setUsos_auth(new UsosAuth());
        mockUser.getUsos_auth().setOauthKey("mockKey");
        mockUser.getUsos_auth().setOauthSecret("mockSecret");
        securityContext = Mockito.mock(SecurityContext.class);
        authentication = Mockito.mock(Authentication.class);
    }

    @Test
    void getCurrentUser() {
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        Mockito.when(authentication.getPrincipal()).thenReturn(mockUser);
        SecurityContextHolder.setContext(securityContext);

        // Call the method to get the current user
        User currentUser = userService.getCurrentUser();

        // Assert the values
        Assertions.assertEquals(10L, currentUser.getId());
        Assertions.assertEquals("mockUser", currentUser.getUsername());
        Assertions.assertEquals("mockPassword", currentUser.getPassword());
        Assertions.assertEquals(Role.ADMIN, currentUser.getRole());
    }

    @Test
    void loadUserById() {
        User user = new User();
        user.setId(1L);
        user.setUsername("admin");
        user.setPassword("password");
        user.setRole(Role.USER);

        // Mock repository behavior
        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User result = userService.loadUserById(1L);

        // Assertions
        Assertions.assertEquals(1L, result.getId());
        Assertions.assertEquals("admin", result.getUsername());
        Assertions.assertEquals("password", result.getPassword());
        Assertions.assertEquals(Role.USER, result.getRole());
    }

    @Test
    void loadUserByUsername() {
        User user = new User();
        user.setId(1L);
        user.setUsername("admin");
        user.setPassword("password");
        user.setRole(Role.USER);

        // Mock repository behavior
        Mockito.when(userRepository.findByUsername("admin")).thenReturn(Optional.of(user));

        User result = userService.loadUserByUsername("admin");

        // Assertions
        Assertions.assertEquals(1L, result.getId());
        Assertions.assertEquals("admin", result.getUsername());
        Assertions.assertEquals("password", result.getPassword());
        Assertions.assertEquals(Role.USER, result.getRole());
    }

    @Test
    void getUserToken() {
        // Create a user with UsosAuth
        User user = new User();
        user.setId(1L);
        user.setUsername("admin");
        user.setPassword("password");
        user.setRole(Role.USER);

        UsosAuth usosAuth = new UsosAuth();
        usosAuth.setOauthKey("key");
        usosAuth.setOauthSecret("secret");

        user.setUsos_auth(usosAuth);

        // Mock the loadUserById method in UserService
        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        // Call the method to get the OAuthToken
        OAuthToken oAuthToken = userService.getUserToken(1L);

        // Assert the values
        Assertions.assertEquals("key", oAuthToken.getValue());
        Assertions.assertEquals("secret", oAuthToken.getSecret());

        // Verify that loadUserById method is called
        Mockito.verify(userRepository, Mockito.times(1)).findById(1L);
    }

    @Test
    void getCurrentUserToken() {
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        Mockito.when(authentication.getPrincipal()).thenReturn(mockUser);
        SecurityContextHolder.setContext(securityContext);

        Mockito.when(userRepository.findById(10L)).thenReturn(Optional.of(mockUser));

        // Call the method to get the OAuthToken
        OAuthToken oAuthToken = userService.getCurrentUserToken();

        // Assert the values
        Assertions.assertEquals("mockKey", oAuthToken.getValue());
        Assertions.assertEquals("mockSecret", oAuthToken.getSecret());
    }

    @Test
    void updateUserToken() {
        // Create a user with UsosAuth
        User user = new User();
        user.setId(1L);

        // Mock the getReferenceById method in UserRepository
        Mockito.when(userRepository.getReferenceById(1L)).thenReturn(user);

        // Create an OAuthToken
        OAuthToken token = new OAuthToken("newKey", "newSecret");

        // Call the method to update user token
        userService.updateUserToken(1L, token);

        // Verify that getReferenceById method is called
        Mockito.verify(userRepository, Mockito.times(1)).getReferenceById(1L);

        // Verify that the user's UsosAuth is updated
        Assertions.assertEquals("newKey", user.getUsos_auth().getOauthKey());
        Assertions.assertEquals("newSecret", user.getUsos_auth().getOauthSecret());
    }

    @Test
    void isUsernameTaken() {
        // Mock repository behavior
        Mockito.when(userRepository.findByUsername("existingUsername")).thenReturn(Optional.of(new User()));

        // Test with an existing username
        boolean taken = userService.isUsernameTaken("existingUsername");
        Assertions.assertTrue(taken);

        // Test with a non-existing username
        taken = userService.isUsernameTaken("nonExistingUsername");
        Assertions.assertFalse(taken);
    }

    @Test
    void updateUserUsername() {
        // Create a user with an initial username
        User user = new User();
        user.setId(1L);
        user.setUsername("oldUsername");

        // Mock the getReferenceById method in UserRepository
        Mockito.when(userRepository.getReferenceById(1L)).thenReturn(user);

        // Call the method to update the username
        userService.updateUserUsername(1L, "newUsername");

        // Verify that getReferenceById method is called
        Mockito.verify(userRepository, Mockito.times(1)).getReferenceById(1L);

        // Verify that the username is updated
        Assertions.assertEquals("newUsername", user.getUsername());
    }

    @Test
    void checkAvatar() {
        // Test with an existing avatar
        boolean validAvatar = userService.checkAvatar("man");
        Assertions.assertTrue(validAvatar);

        // Test with a non-existing avatar
        validAvatar = userService.checkAvatar("nonExistingAvatar");
        Assertions.assertFalse(validAvatar);
    }

    @Test
    void changeAvatar() {
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        Mockito.when(authentication.getPrincipal()).thenReturn(mockUser);
        SecurityContextHolder.setContext(securityContext);

        // Call the method to change the avatar
        userService.changeAvatar("woman");

        Mockito.when(userRepository.findById(10L)).thenReturn(Optional.of(mockUser));

        // Verify that the avatar is updated
        User result = userService.loadUserById(10L);

        Assertions.assertEquals("woman", result.getAvatar());
    }
}