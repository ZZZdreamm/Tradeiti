package com.example.usos_oauth.usos.service.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CourseDTO {

    private String course_id;
    private String course_name;
    private List<GroupDTO> groups;
}
