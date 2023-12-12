package com.example.usos_oauth.security.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Enumeration representing different avatars available for users.
 */
@Getter
@AllArgsConstructor
public enum Avatar {
    /**
     * Avatar representing a helicopter.
     */
    HELICOPTER("helicopter"),
    /**
     * Avatar representing a man.
     */
    MAN("man"),
    /**
     * Avatar representing a woman.
     */
    WOMAN("woman");
    /**
     * The String representation of the avatar.
     */
    private final String avatar;
}
