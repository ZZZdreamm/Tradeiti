package com.example.usos_oauth.usos.controller;

import com.example.usos_oauth.security.service.UserService;
import com.example.usos_oauth.usos.connect.UsosServiceProvider;
import com.example.usos_oauth.usos.service.UsosService;
import com.example.usos_oauth.usos.service.model.CourseDTO;
import com.example.usos_oauth.usos.service.model.GroupDTO;
import lombok.AllArgsConstructor;
import org.springframework.social.oauth1.OAuthToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/courses")
public class CoursesController {

    private UsosServiceProvider usosServiceProvider;
    private UserService userService;

    @GetMapping("/user")
    public List<CourseDTO> getCourseEditions() {
        OAuthToken token = userService.getCurrentUserToken();
        UsosService usos = usosServiceProvider.getUsosService(token);
        return usos.getUserActiveCourses();
    }

    @GetMapping("{course-id}/groups")
    public List<GroupDTO> getCourseGroups(@PathVariable("course-id") String course_id) {
        OAuthToken token = userService.getCurrentUserToken();
        UsosService usos = usosServiceProvider.getUsosService(token);
        return usos.getCourseGroups(course_id);
    }
}
