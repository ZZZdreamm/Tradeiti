package com.example.usos_oauth.offers.service.utils;

import com.example.usos_oauth.offers.model.dao.Course;
import com.example.usos_oauth.offers.model.dao.Offer;
import com.example.usos_oauth.offers.model.dto.OfferDTO;
import com.example.usos_oauth.usos.model.dto.CourseDTO;
import com.example.usos_oauth.usos.model.dto.GroupDTO;

import java.util.List;

public class OfferDTOMapper {
    public static Course mapToCourse(CourseDTO courseDTO) {
        Course course = new Course();
        GroupDTO groupDTO = courseDTO.getGroups().getFirst();
        course.setGroupNumber(groupDTO.getGroupNumber());
        course.setName(courseDTO.getCourseName());
        course.setWeekDay(groupDTO.getWeekday());
        course.setStartHour(groupDTO.getStartTime());
        course.setEndHour(groupDTO.getEndTime());
        course.setCourseFullName(courseDTO.getCourseId());
        return course;
    }

    public static CourseDTO mapToCourseDTO(Course course) {
        return CourseDTO.builder()
                .courseId(course.getCourseFullName())
                .courseName(course.getName())
                .groups(List.of(GroupDTO.builder()
                        .groupNumber(course.getGroupNumber())
                        .weekday(course.getWeekDay())
                        .startTime(course.getStartHour())
                        .endTime(course.getEndHour())
                        .build()))
                .build();
    }

    public static OfferDTO mapToOfferDTO(Offer offer) {
        return OfferDTO.builder()
                .offerId(offer.getOfferId())
                .ownerUsername(offer.getOwner().getUsername())
                .receiverUsername(offer.getReceiver().getUsername())
                .state(offer.getState())
                .myCourse(mapToCourseDTO(offer.getMyCourse()))
                .wantedCourse(mapToCourseDTO(offer.getWantedCourse()))
                .build();
    }
}
