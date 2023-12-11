package com.example.usos_oauth.security.repository;

import com.example.usos_oauth.security.model.Role;
import com.example.usos_oauth.security.model.User;
import com.example.usos_oauth.security.model.UsosAuth;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void findByUsername() {
        // Given
        User user = new User();
        user.setUsername("admin");
        user.setPassword("password");
        user.setRole(Role.USER);
        userRepository.save(user);

        // When
        User result = userRepository.findByUsername("admin").get();

        // Then
        assert result.getUsername().equals("admin");
        assert result.getPassword().equals("password");
        assert result.getRole().equals(Role.USER);
    }

    @Test
    void findByUsername_NonExistingUser_ReturnsEmptyOptional() {
        // When
        User result = userRepository.findByUsername("nonExistingUser").orElse(null);

        // Then
        Assertions.assertNull(result);
    }

    @Test
    void saveUserWithUsosAuth_UserWithUsosAuthIsSaved() {
        // Given
        User user = new User();
        user.setUsername("userWithUsosAuth");
        user.setPassword("password");
        user.setRole(Role.USER);

        UsosAuth usosAuth = new UsosAuth();
        usosAuth.setOauthKey("key");
        usosAuth.setOauthSecret("secret");
        user.setUsos_auth(usosAuth);

        // When
        userRepository.save(user);

        // Then
        User result = userRepository.findByUsername("userWithUsosAuth").orElse(null);
        Assertions.assertNotNull(result);
        Assertions.assertNotNull(result.getUsos_auth());
        Assertions.assertEquals("key", result.getUsos_auth().getOauthKey());
        Assertions.assertEquals("secret", result.getUsos_auth().getOauthSecret());
    }

}