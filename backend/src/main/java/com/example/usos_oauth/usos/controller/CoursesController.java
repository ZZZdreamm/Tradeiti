package com.example.usos_oauth.usos.controller;

import com.example.usos_oauth.usos.model.dto.CourseDTO;
import com.example.usos_oauth.usos.model.dto.GroupDTO;
import com.example.usos_oauth.usos.service.connect.UsosServiceAuthorizer;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/courses")
@Tag(name = "User courses from USOS")
public class CoursesController {

    private UsosServiceAuthorizer usosServiceAuthorizer;

    @GetMapping("/user")
    public List<CourseDTO> getUserCourses() {
        return usosServiceAuthorizer.getUsosService().getCurrentUserCourses();
    }

    @GetMapping("groups/{course-id}")
    public List<GroupDTO> getGroupsOfCourse(@PathVariable("course-id") String course_id) {
        return usosServiceAuthorizer.getUsosService().getCourseGroups(course_id);
    }
}
