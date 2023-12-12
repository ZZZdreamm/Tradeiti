package com.example.usos_oauth.security.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;

/**
 * Entity class representing a user in the system.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="users")
public class User implements UserDetails {

    /**
     * Primary key identifier for the user entity.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", allocationSize = 1)
    private Long id;
    /**
     * Username of the user.
     */
    private String username;
    /**
     * Password of the user.
     */
    private String password;
    /**
     * Role of the user.
     */
    @Enumerated(EnumType.STRING)
    private Role role;
    /**
     * Authentication key for external authentication services.
     */
    private String authentication_key;
    /**
     * Authentication secret for external authentication services.
     */
    private String authentication_secret;
    /**
     * One-to-one relationship with the UsosAuth entity, representing USOS authentication information.
     */
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private UsosAuth usos_auth;
    /**
     * Avatar associated with the user.
     */
    private String avatar;

    /**
     * Retrieves the authorities (roles) assigned to the user.
     *
     * @return A collection of GrantedAuthority objects representing the user's roles.
     * @see UserDetails#getAuthorities()
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    /**
     * Retrieves the username used to authenticate the user.
     *
     * @return The username associated with the user.
     * @see UserDetails#getUsername()
     */
    @Override
    public String getUsername() {
        return username;
    }

    /**
     * Retrieves the password used to authenticate the user.
     *
     * @return The password associated with the user.
     * @see UserDetails#getPassword()
     */
    @Override
    public String getPassword() {
        return password;
    }

    /**
     * Indicates whether the user's account is non-expired.
     *
     * @return Always returns true.
     * @see UserDetails#isAccountNonExpired()
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user's account is non-locked.
     *
     * @return Always returns true.
     * @see UserDetails#isAccountNonLocked()
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Indicates whether the user's credentials (password) are non-expired.
     *
     * @return Always returns true.
     * @see UserDetails#isCredentialsNonExpired()
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user is enabled.
     *
     * @return Always returns true.
     * @see UserDetails#isEnabled()
     */
    @Override
    public boolean isEnabled() {
        return true;
    }

}
