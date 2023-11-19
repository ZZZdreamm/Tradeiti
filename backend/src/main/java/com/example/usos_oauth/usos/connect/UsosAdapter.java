package com.example.usos_oauth.usos.connect;

import com.example.usos_oauth.usos.api.Usos;
import org.springframework.social.connect.ApiAdapter;
import org.springframework.social.connect.ConnectionValues;
import org.springframework.social.connect.UserProfile;

public class UsosAdapter implements ApiAdapter<Usos> {

    @Override
    public boolean test(Usos usos) {
        return false;
    }

    @Override
    public void setConnectionValues(Usos usos, ConnectionValues connectionValues) {

    }

    @Override
    public UserProfile fetchUserProfile(Usos usos) {
        return null;
    }

    @Override
    public void updateStatus(Usos usos, String s) {

    }
}
