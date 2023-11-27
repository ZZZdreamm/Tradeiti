package com.example.usos_oauth.usos.service.model;

import com.example.usos_oauth.usos.api.model.LangDict;
import com.example.usos_oauth.usos.api.model.Lecturer;
import lombok.Data;

import java.util.List;

@Data
public class UserCourse {
    private String course_id;
    private LangDict course_name;
    private String start_time;
    private String end_time;
    private int group_number;
    private List<Lecturer> lecturers;
}
