package com.example.usos_oauth.usos.api;

import com.example.usos_oauth.usos.api.logic.Term;
import com.example.usos_oauth.usos.api.model.Activity;
import com.example.usos_oauth.usos.api.model.CourseEdition;
import com.example.usos_oauth.usos.api.model.CourseResponse;
import com.example.usos_oauth.usos.api.model.UsosUser;
import org.springframework.social.oauth1.AbstractOAuth1ApiBinding;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class UsosTemplate extends AbstractOAuth1ApiBinding {

    URI courseEditionsUri = URI.create("https://apps.usos.pw.edu.pl/services/courses/user");
    URI userUri = URI.create("https://apps.usos.pw.edu.pl/services/users/user");
    URI userGroups = URI.create("https://apps.usos.pw.edu.pl/services/tt/course_edition");

    public UsosTemplate(String consumerKey, String consumerSecret, String accessToken, String secret) {
        super(consumerKey, consumerSecret, accessToken, secret);
    }

    public List<CourseEdition> getCourseEditions() {
        RestTemplate restTemplate = getRestTemplate();
        CourseResponse response = restTemplate.getForObject(courseEditionsUri, CourseResponse.class);
        assert response != null;
        return response.getCourse_editions().get(Term.getAcademicTerm());
    }

    public void getUser() {
        RestTemplate restTemplate = getRestTemplate();
        restTemplate.getForObject(userUri, UsosUser.class);
    }

    public List<Activity> getUserGroups(Map<String, String> params){
      RestTemplate restTemplate = getRestTemplate();
      URI uri = UriComponentsBuilder.fromUri(userGroups)
        .queryParam("course_id", params.get("course_id"))
        .queryParam("term_id", params.get("term_id"))
        .queryParam("fields", "name|start_time|end_time|course_name|lecturer_ids|classtype_name")
        .build()
        .toUri();
      Activity[] response = restTemplate.getForObject(uri, Activity[].class);

      assert response != null;
      List<Activity> filteredResponse = Arrays.stream(response)
          .filter(entry -> !"Wykład".equals(entry.getClasstype_name().getPl()))
          .toList();

//      for (Activity activity : response) {
//          updateLecturerInfo(activity);
//      }

      return filteredResponse;
    }

    private void updateLecturerInfo(Activity activity) {
        RestTemplate restTemplate = getRestTemplate();
        List<Long> lecturerIds = activity.getLecturer_ids();
        URI uri = UriComponentsBuilder.fromUri(userUri)
                .queryParam("user_id", lecturerIds)
                .build()
                .toUri();
        for (int i = 0; i < lecturerIds.size(); i++) {
//          W tym miejscu wali mi 401 - Unauthorized tak jakby jwt nie działał pomocy
            UsosUser user = restTemplate.getForObject(uri, UsosUser.class);
            assert user != null;
            activity.getLecturer_names().add(user.getFirst_name() + " " + user.getLast_name());
        }
    }
}
