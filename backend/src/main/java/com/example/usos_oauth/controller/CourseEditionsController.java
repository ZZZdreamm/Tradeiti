package com.example.usos_oauth.controller;

import com.example.usos_oauth.usos.api.Usos;
import com.example.usos_oauth.usos.api.impl.model.CourseEdition;
import com.example.usos_oauth.usos.connect.UsosServiceProvider;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/course-editions")
public class CourseEditionsController {

    private UsosServiceProvider usosServiceProvider;

    @GetMapping
    public List<CourseEdition> getCourseEditions(@RequestParam("access_token") String accessToken,
                                                 @RequestParam("access_secret") String accessSecret) {
        Usos api = usosServiceProvider.getApi(accessToken, accessSecret);
        return api.getCourseEditions();
    }
}
