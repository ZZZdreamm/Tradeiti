package com.example.usos_oauth.usos.controller;

import com.example.usos_oauth.security.service.UserService;
import com.example.usos_oauth.usos.api.UsosTemplate;
import com.example.usos_oauth.usos.api.model.Activity;
import com.example.usos_oauth.usos.connect.UsosServiceProvider;
import lombok.AllArgsConstructor;
import org.springframework.social.oauth1.OAuthToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping("api/course-get-all-groups")
public class CourseAllGroupsController {

    private UsosServiceProvider usosServiceProvider;
    private UserService userService;

    @GetMapping
    public List<Activity> getUserGroups(@RequestParam String course_id,
                                        @RequestParam String term_id) {
        Map<String, String> params = new HashMap<>();
        params.put("course_id", course_id);
        params.put("term_id", term_id);
        OAuthToken token = userService.getCurrentUserToken();
        UsosTemplate api = usosServiceProvider.getApi(token);
        return api.getUserGroups(params);
    }
}
