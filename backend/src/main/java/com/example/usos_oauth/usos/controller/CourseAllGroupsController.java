package com.example.usos_oauth.usos.controller;

import com.example.usos_oauth.security.service.UserService;
import com.example.usos_oauth.usos.api.model.Activity;
import com.example.usos_oauth.usos.connect.UsosServiceProvider;
import com.example.usos_oauth.usos.service.UsosService;
import lombok.AllArgsConstructor;
import org.springframework.social.oauth1.OAuthToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/course-get-all-groups")
public class CourseAllGroupsController {

    private UsosServiceProvider usosServiceProvider;
    private UserService userService;

    @GetMapping
    public List<Activity> getUserGroups(@RequestParam String course_id,
                                        @RequestParam String term_id) {
        OAuthToken token = userService.getCurrentUserToken();
        UsosService service = usosServiceProvider.getUsosService(token);
        return service.getUserGroups(course_id, term_id);
    }
}
