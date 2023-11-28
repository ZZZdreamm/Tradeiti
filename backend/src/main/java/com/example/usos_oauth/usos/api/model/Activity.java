package com.example.usos_oauth.usos.api.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Activity {
    private LangDict name;
    private String start_time;
    private String end_time;
    private LangDict course_name;
    private List<Long> lecturer_ids;
    private LangDict classtype_name;
    private List<String> lecturer_names = new ArrayList<>();
}
