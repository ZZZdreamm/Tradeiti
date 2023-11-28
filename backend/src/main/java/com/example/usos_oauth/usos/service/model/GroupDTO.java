package com.example.usos_oauth.usos.service.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GroupDTO {

    private int group_number;
    private String class_type_name;
    private List<String> lecturers;
    private String start_time;
    private String end_time;
    private String weekday;
}
