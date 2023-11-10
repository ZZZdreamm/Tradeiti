package com.example.usos_oauth.controller;

import com.example.usos_oauth.usos.api.impl.CourseEdition;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/course-editions")
public class CourseEditionsController {

    @GetMapping
    public List<CourseEdition> getCourseEditions(@RequestParam("access_token") String accessToken,
                                                 @RequestParam("access_secret") String accessSecret) {
        Usos api = usosServiceProvider.getApi(accessToken, accessSecret);
        return api.getCourseEditions();
    }
}
