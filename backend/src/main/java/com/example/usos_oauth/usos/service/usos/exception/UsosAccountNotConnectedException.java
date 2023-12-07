package com.example.usos_oauth.usos.service.usos.exception;

import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@NoArgsConstructor
@ResponseStatus(HttpStatus.PROXY_AUTHENTICATION_REQUIRED)
public class UsosAccountNotConnectedException extends RuntimeException {}