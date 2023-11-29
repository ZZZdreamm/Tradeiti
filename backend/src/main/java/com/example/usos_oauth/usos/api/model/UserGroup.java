package com.example.usos_oauth.usos.api.model;

import lombok.Data;

import java.util.List;

@Data
public class UserGroup {
    private String course_unit_id;
    private int group_number;
    private LangDict class_type;
    private String class_type_id;
    private String group_url;
    private String course_id;
    private LangDict course_name;
    private String course_homepage_url;
    private int course_is_currently_conducted;
    private String course_fac_id;
    private String course_lang_id;
    private String term_id;
    private List<Lecturer> lecturers;
    private List<Participant> participants;
}
