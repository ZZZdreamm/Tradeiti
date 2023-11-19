package com.example.usos_oauth.usos.api.impl.model;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class CourseResponse {
    private Map<String, List<CourseEdition>> course_editions;
}

