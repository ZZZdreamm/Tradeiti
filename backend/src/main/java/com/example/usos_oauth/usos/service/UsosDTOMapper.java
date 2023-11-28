package com.example.usos_oauth.usos.service;

import com.example.usos_oauth.usos.api.model.CourseEdition;
import com.example.usos_oauth.usos.api.model.UserGroup;
import com.example.usos_oauth.usos.service.model.CourseDTO;
import com.example.usos_oauth.usos.service.model.GroupDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UsosDTOMapper {

    public GroupDTO mapToGroupDTO(UserGroup userGroup) {
        return GroupDTO.builder()
                .group_number(userGroup.getGroup_number())
                .class_type_name(userGroup.getClass_type().getPl())
                .lecturers(userGroup.getLecturers().stream()
                        .map(lecturer -> lecturer.getFirst_name() + " " + lecturer.getLast_name())
                        .toList())
                .build();
    }

    public CourseDTO mapToCourseDTO(CourseEdition courseEdition) {
        return CourseDTO.builder()
                .course_id(courseEdition.getCourse_id())
                .course_name(courseEdition.getCourse_name().getPl())
                .groups(courseEdition.getUser_groups().stream()
                        .map(this::mapToGroupDTO)
                        .toList())
                .build();
    }
}
