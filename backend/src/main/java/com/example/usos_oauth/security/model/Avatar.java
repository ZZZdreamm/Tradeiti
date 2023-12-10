package com.example.usos_oauth.security.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Avatar {
    HELICOPTER("helicopter"),
    MAN("man"),
    WOMAN("woman");
    private final String avatar;
}
