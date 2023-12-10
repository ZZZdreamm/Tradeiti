package com.example.usos_oauth.security.auth.service;

import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@NoArgsConstructor
@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class UnknownAvatarException extends RuntimeException{}
