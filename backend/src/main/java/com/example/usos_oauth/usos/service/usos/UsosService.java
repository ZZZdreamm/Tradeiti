package com.example.usos_oauth.usos.service.usos;

import com.example.usos_oauth.usos.api.UsosTemplate;
import com.example.usos_oauth.usos.model.usos.Activity;
import com.example.usos_oauth.usos.model.usos.UsosUser;
import com.example.usos_oauth.usos.model.dto.CourseDTO;
import com.example.usos_oauth.usos.model.dto.GroupDTO;
import com.example.usos_oauth.usos.service.usos.exception.UsosAccountNotConnectedException;
import com.example.usos_oauth.usos.service.usos.utils.UsosDTOMapper;
import com.example.usos_oauth.usos.service.usos.utils.UsosDateTimeParser;
import com.example.usos_oauth.usos.service.usos.utils.UsosTermCalculator;
import lombok.AllArgsConstructor;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@AllArgsConstructor
public class UsosService {

    private UsosTemplate usosTemplate;

    public boolean isUserConnected() {
        try {
            usosTemplate.getUser();
            return true;
        } catch (HttpClientErrorException.Unauthorized e) {
            return false;
        }
    }

    private void assertUserIsConnected() {
        if (!isUserConnected()) {
            throw new UsosAccountNotConnectedException();
        }
    }

    public List<GroupDTO> getCourseGroups(String courseId) {
        assertUserIsConnected();
        String currentTerm = UsosTermCalculator.getCurrentAcademicTerm();
        List<Activity> activities = usosTemplate.getCourseActivities(courseId, currentTerm);
        activities = processActivities(activities);
        return activities.stream()
                .map(UsosDTOMapper::mapToGroupDTO)
                .toList();
    }

    public List<CourseDTO> getCurrentUserCourses() {
        assertUserIsConnected();
        List<Activity> activities = usosTemplate.getUserActivities();
        activities = processActivities(activities);
        return UsosDTOMapper.mapToCourseDTOList(activities);
    }

    public List<String> getCurrentUserCoursesIds() {
        assertUserIsConnected();
        List<CourseDTO> courses = getCurrentUserCourses();
        return courses.stream()
                .map(CourseDTO::getCourseId)
                .toList();
    }

    public boolean IsCurrentUserInGroup(String wantedCourseId, int wantedGroupNumber) {
        assertUserIsConnected();
        List<CourseDTO> courses = getCurrentUserCourses();
        return courses.stream()
                .filter(course -> course.getCourseId().equals(wantedCourseId))
                .anyMatch(course -> course.getGroups().stream()
                        .anyMatch(group -> group.getGroupNumber() == wantedGroupNumber));
    }

    private List<Activity> processActivities(List<Activity> activities) {
        activities = removeLectures(activities);
        updateLecturer(activities);
        parseDateTime(activities);
        return activities;
    }

    private List<Activity> removeLectures(List<Activity> activities) {
        return activities.stream()
                .filter(activity -> !activity.getClasstypeName().getPl().equals("Wykład"))
                .toList();
    }

    private void parseDateTime(List<Activity> activities) {
        for (Activity activity : activities) {
            activity.setWeekday(UsosDateTimeParser.parseWeekday(activity.getStartTime()));
            activity.setStartTime(UsosDateTimeParser.parseHour(activity.getStartTime()));
            activity.setEndTime(UsosDateTimeParser.parseHour(activity.getEndTime()));
        }
    }

    private void updateLecturer(List<Activity> activities) {
        for (Activity activity : activities) {
            for (Long lecturerId : activity.getLecturerIds()) {
                UsosUser user = usosTemplate.getUser(String.valueOf(lecturerId));
                activity.getLecturerNames().add(user.getFirstName() + " " + user.getLastName());
            }
        }
    }
}
