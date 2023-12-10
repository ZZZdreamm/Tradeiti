package com.example.usos_oauth.security.repository;

import com.example.usos_oauth.security.model.Role;
import com.example.usos_oauth.security.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void findByUsername() {
        User user = new User();
        user.setUsername("admin");
        user.setPassword("password");
        user.setRole(Role.USER);
        userRepository.save(user);

        User result = userRepository.findByUsername("admin").get();
        assert result.getUsername().equals("admin");
        assert result.getPassword().equals("password");
        assert result.getRole().equals(Role.USER);
    }

}