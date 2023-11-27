package com.example.usos_oauth.usos.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.List;

@Data
public class CourseEdition {
    private String course_id;
    private LangDict course_name;
    private String term_id;
    @JsonIgnore
    private List<UserGroup> user_groups;
}
