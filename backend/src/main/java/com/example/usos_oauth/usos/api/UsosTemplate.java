package com.example.usos_oauth.usos.api;

import com.example.usos_oauth.usos.api.logic.Term;
import com.example.usos_oauth.usos.api.model.*;
import org.springframework.social.oauth1.AbstractOAuth1ApiBinding;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

public class UsosTemplate extends AbstractOAuth1ApiBinding {

    URI courseEditionsUri = URI.create("https://apps.usos.pw.edu.pl/services/courses/user");
    URI userUri = URI.create("https://apps.usos.pw.edu.pl/services/users/user");

    public UsosTemplate(String consumerKey, String consumerSecret, String accessToken, String secret) {
        super(consumerKey, consumerSecret, accessToken, secret);
    }

    public List<CourseEdition> getCourseEditions() {
        RestTemplate restTemplate = getRestTemplate();
        CourseResponse response = restTemplate.getForObject(courseEditionsUri, CourseResponse.class);
        return response.getCourse_editions().get(Term.getAcademicTerm());
    }
    public UsosUser getUser() {
        RestTemplate restTemplate = getRestTemplate();
        return restTemplate.getForObject(userUri, UsosUser.class);
    }
}
