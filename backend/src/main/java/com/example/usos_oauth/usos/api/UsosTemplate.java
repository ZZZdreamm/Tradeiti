package com.example.usos_oauth.usos.api;

import com.example.usos_oauth.usos.model.usos.Activity;
import com.example.usos_oauth.usos.model.usos.UsosUser;
import org.springframework.social.oauth1.AbstractOAuth1ApiBinding;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

public class UsosTemplate extends AbstractOAuth1ApiBinding {

    URI userUrl = URI.create("https://apps.usos.pw.edu.pl/services/users/user");
    URI courseActivitiesUrl = URI.create("https://apps.usos.pw.edu.pl/services/tt/course_edition");
    URI userActivitiesUrl = URI.create("https://apps.usos.pw.edu.pl/services/tt/student");
    String activitiesFields = "course_name|course_id|group_number|start_time|end_time|course_name|lecturer_ids|classtype_name";

    public UsosTemplate(String consumerKey, String consumerSecret, String accessToken, String secret) {
        super(consumerKey, consumerSecret, accessToken, secret);
    }

    public UsosUser getUser() {
        RestTemplate restTemplate = getRestTemplate();
        return restTemplate.getForObject(userUrl, UsosUser.class);
    }

    public UsosUser getUser(String userId) {
        RestTemplate restTemplate = getRestTemplate();
        URI uri = UriComponentsBuilder.fromUri(userUrl)
                .queryParam("user_id", userId)
                .build()
                .toUri();
        return restTemplate.getForObject(uri, UsosUser.class);
    }

    public List<Activity> getCourseActivities(String courseId, String termId) {
      RestTemplate restTemplate = getRestTemplate();
      URI uri = UriComponentsBuilder.fromUri(courseActivitiesUrl)
        .queryParam("course_id", courseId)
        .queryParam("term_id", termId)
        .queryParam("fields", activitiesFields)
        .build()
        .toUri();
      Activity[] response = restTemplate.getForObject(uri, Activity[].class);
      assert response != null;
      return List.of(response);
    }

    public List<Activity> getUserActivities() {
      RestTemplate restTemplate = getRestTemplate();
      URI uri = UriComponentsBuilder.fromUri(userActivitiesUrl)
        .queryParam("fields", activitiesFields)
        .build()
        .toUri();
      Activity[] response = restTemplate.getForObject(uri, Activity[].class);
        assert response != null;
        return List.of(response);
    }
}
