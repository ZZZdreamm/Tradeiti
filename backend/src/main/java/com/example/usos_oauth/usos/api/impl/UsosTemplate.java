package com.example.usos_oauth.usos.api.impl;

import com.example.usos_oauth.usos.api.Usos;
import com.example.usos_oauth.usos.api.impl.model.CourseEdition;
import com.example.usos_oauth.usos.api.impl.model.CourseResponse;
import org.springframework.social.oauth1.AbstractOAuth1ApiBinding;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.List;

public class UsosTemplate extends AbstractOAuth1ApiBinding implements Usos {

    URI courseEditionsUri = URI.create("https://apps.usos.pw.edu.pl/services/courses/user");

    public UsosTemplate(String consumerKey, String consumerSecret, String accessToken, String secret) {
        super(consumerKey, consumerSecret, accessToken, secret);
    }

    public List<CourseEdition> getCourseEditions() {
        RestTemplate restTemplate = getRestTemplate();
        CourseResponse response = restTemplate.getForObject(courseEditionsUri, CourseResponse.class);
        return response.getCourse_editions().get("2023Z");
    }
}
