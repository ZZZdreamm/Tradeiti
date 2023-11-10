package com.example.usos_oauth.controller;

import com.example.usos_oauth.usos.api.impl.CourseEdition;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/course-editions")
public class CourseEditionsController {

    @GetMapping
    public List<CourseEdition> getCourseEditions() {
        return null;
    }
}
