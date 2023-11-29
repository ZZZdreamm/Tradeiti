package com.example.usos_oauth.usos.api.model;

import lombok.Data;

import java.util.List;

@Data
public class CourseEdition {
    private String course_id;
    private LangDict course_name;
    private String term_id;
    private List<UserGroup> user_groups;
}
