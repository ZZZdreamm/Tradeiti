package com.example.usos_oauth.usos.api.impl;

import com.example.usos_oauth.usos.api.Usos;
import org.springframework.social.oauth1.AbstractOAuth1ApiBinding;

import java.util.List;

public class UsosTemplate extends AbstractOAuth1ApiBinding implements Usos {

    public UsosTemplate(String consumerKey, String consumerSecret, String accessToken, String secret) {
        super(consumerKey, consumerSecret, accessToken, secret);
    }

    public List<CourseEdition> getCourseEditions() {
        return null;
    }
}
