package com.example.usos_oauth.usos.service;

import com.example.usos_oauth.usos.api.model.Activity;
import com.example.usos_oauth.usos.api.model.CourseEdition;
import com.example.usos_oauth.usos.api.model.UserGroup;
import com.example.usos_oauth.usos.service.model.CourseDTO;
import com.example.usos_oauth.usos.service.model.GroupDTO;

import java.util.ArrayList;
import java.util.List;


public class UsosDTOMapper {

    public static GroupDTO mapToGroupDTO(UserGroup userGroup) {
        return GroupDTO.builder()
                .group_number(userGroup.getGroup_number())
                .class_type_name(userGroup.getClass_type().getPl())
                .lecturers(userGroup.getLecturers().stream()
                        .map(lecturer -> lecturer.getFirst_name() + " " + lecturer.getLast_name())
                        .toList())
                .build();
    }

    public static CourseDTO mapToCourseDTO(CourseEdition courseEdition) {
        return CourseDTO.builder()
                .course_id(courseEdition.getCourse_id())
                .course_name(courseEdition.getCourse_name().getPl())
                .groups(courseEdition.getUser_groups().stream()
                        .map(UsosDTOMapper::mapToGroupDTO)
                        .toList())
                .build();
    }

    public static GroupDTO mapToGroupDTO(Activity activity) {
        return GroupDTO.builder()
                .group_number(activity.getGroup_number())
                .class_type_name(activity.getClasstype_name().getPl())
                .lecturers(activity.getLecturer_names())
                .weekday(activity.getWeekday())
                .start_time(activity.getStart_time())
                .end_time(activity.getEnd_time())
                .build();
    }

    public static List<CourseDTO> mapToCourseDTOList(List<Activity> activities) {
        List<CourseDTO> courses = new ArrayList<>();
        List<String> courseIds = activities.stream()
                .map(Activity::getCourse_id)
                .distinct()
                .toList();
        for (String courseId : courseIds) {
            List<Activity> courseActivities = activities.stream()
                    .filter(activity -> activity.getCourse_id().equals(courseId))
                    .toList();
            CourseDTO courseDTO = CourseDTO.builder()
                    .course_id(courseId)
                    .course_name(courseActivities.get(0).getCourse_name().getPl())
                    .groups(courseActivities.stream()
                            .map(UsosDTOMapper::mapToGroupDTO)
                            .toList())
                    .build();
            courses.add(courseDTO);
        }
        return courses;
    }
}
