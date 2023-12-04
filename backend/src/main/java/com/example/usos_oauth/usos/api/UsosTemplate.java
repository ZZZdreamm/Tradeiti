package com.example.usos_oauth.usos.api;

import com.example.usos_oauth.usos.api.model.Activity;
import com.example.usos_oauth.usos.api.model.CourseEdition;
import com.example.usos_oauth.usos.api.model.CourseResponse;
import com.example.usos_oauth.usos.api.model.UsosUser;
import org.springframework.social.oauth1.AbstractOAuth1ApiBinding;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Map;

public class UsosTemplate extends AbstractOAuth1ApiBinding {

    URI courseEditionsUri = URI.create("https://apps.usos.pw.edu.pl/services/courses/user");
    URI userUri = URI.create("https://apps.usos.pw.edu.pl/services/users/user");
    URI userGroups = URI.create("https://apps.usos.pw.edu.pl/services/tt/course_edition");

    public UsosTemplate(String consumerKey, String consumerSecret, String accessToken, String secret) {
        super(consumerKey, consumerSecret, accessToken, secret);
    }

    public Map<String, List<CourseEdition>> getUserCourseEditions() {
        RestTemplate restTemplate = getRestTemplate();
        return restTemplate.getForObject(courseEditionsUri, CourseResponse.class).getCourse_editions();
    }

    public UsosUser getUser() {
        RestTemplate restTemplate = getRestTemplate();
        return restTemplate.getForObject(userUri, UsosUser.class);
    }

    public UsosUser getUser(String userId) {
        RestTemplate restTemplate = getRestTemplate();
        URI uri = UriComponentsBuilder.fromUri(userUri)
                .queryParam("user_id", userId)
                .build()
                .toUri();
        return restTemplate.getForObject(uri, UsosUser.class);
    }

    public List<Activity> getCourseActivities(String course_id, String term_id){
      RestTemplate restTemplate = getRestTemplate();
      URI uri = UriComponentsBuilder.fromUri(userGroups)
        .queryParam("course_id", course_id)
        .queryParam("term_id", term_id)
        .queryParam("fields", "group_number|start_time|end_time|course_name|lecturer_ids|classtype_name")
        .build()
        .toUri();
      Activity[] response = restTemplate.getForObject(uri, Activity[].class);
      assert response != null;
      return List.of(response);
    }
}
