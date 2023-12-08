package com.example.usos_oauth.usos.service.connect;

import com.example.usos_oauth.security.service.UserService;
import com.example.usos_oauth.usos.service.usos.UsosService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UsosServiceAuthorizer {

    UsosServiceProvider usosServiceProvider;
    UserService userService;

    public UsosService getUsosService() {
        return usosServiceProvider.getUsosService(userService.getCurrentUserToken());
    }
}
