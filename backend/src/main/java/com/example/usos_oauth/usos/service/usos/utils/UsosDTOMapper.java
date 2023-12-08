package com.example.usos_oauth.usos.service.usos.utils;

import com.example.usos_oauth.usos.model.usos.Activity;
import com.example.usos_oauth.usos.model.dto.CourseDTO;
import com.example.usos_oauth.usos.model.dto.GroupDTO;

import java.util.ArrayList;
import java.util.List;


public class UsosDTOMapper {

    public static GroupDTO mapToGroupDTO(Activity activity) {
        return GroupDTO.builder()
                .groupNumber(activity.getGroupNumber())
                .classTypeName(activity.getClasstypeName().getPl())
                .lecturers(activity.getLecturerNames())
                .weekday(activity.getWeekday())
                .startTime(activity.getStartTime())
                .endTime(activity.getEndTime())
                .build();
    }

    public static List<CourseDTO> mapToCourseDTOList(List<Activity> activities) {
        List<CourseDTO> courses = new ArrayList<>();
        List<String> courseIds = activities.stream()
                .map(Activity::getCourseId)
                .distinct()
                .toList();
        for (String courseId : courseIds) {
            List<Activity> courseActivities = activities.stream()
                    .filter(activity -> activity.getCourseId().equals(courseId))
                    .toList();
            CourseDTO courseDTO = CourseDTO.builder()
                    .courseId(courseId)
                    .courseName(courseActivities.get(0).getCourseName().getPl())
                    .groups(courseActivities.stream()
                            .map(UsosDTOMapper::mapToGroupDTO)
                            .toList())
                    .build();
            courses.add(courseDTO);
        }
        return courses;
    }
}
