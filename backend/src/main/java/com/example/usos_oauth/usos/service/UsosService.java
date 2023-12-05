package com.example.usos_oauth.usos.service;

import com.example.usos_oauth.usos.api.UsosTemplate;
import com.example.usos_oauth.usos.api.model.Activity;
import com.example.usos_oauth.usos.api.model.UsosUser;
import com.example.usos_oauth.usos.service.exception.UsosAccountNotConnectedException;
import com.example.usos_oauth.usos.service.model.CourseDTO;
import com.example.usos_oauth.usos.service.model.GroupDTO;
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

    public List<GroupDTO> getCourseGroups(String course_id) {
        assertUserIsConnected();
        String currentTerm = UsosTermCalculator.getCurrentAcademicTerm();
        List<Activity> activities = usosTemplate.getCourseActivities(course_id, currentTerm);
        activities = processActivities(activities);
        return activities.stream()
                .map(UsosDTOMapper::mapToGroupDTO)
                .toList();
    }

    public List<CourseDTO> getUserCourses() {
        assertUserIsConnected();
        List<Activity> activities = usosTemplate.getUserActivities();
        activities = processActivities(activities);
        return UsosDTOMapper.mapToCourseDTOList(activities);
    }

    private List<Activity> processActivities(List<Activity> activities) {
        activities = removeLectures(activities);
        updateLecturer(activities);
        parseDateTime(activities);
        return activities;
    }

    private List<Activity> removeLectures(List<Activity> activities) {
        return activities.stream()
                .filter(activity -> !activity.getClasstype_name().getPl().equals("Wykład"))
                .toList();
    }

    private void parseDateTime(List<Activity> activities) {
        for (Activity activity : activities) {
            activity.setWeekday(UsosDateTimeMapper.parseWeekday(activity.getStart_time()));
            activity.setStart_time(UsosDateTimeMapper.parseHour(activity.getStart_time()));
            activity.setEnd_time(UsosDateTimeMapper.parseHour(activity.getEnd_time()));
        }
    }

    private void updateLecturer(List<Activity> activities) {
        for (Activity activity : activities) {
            for (Long lecturerId : activity.getLecturer_ids()) {
                UsosUser user = usosTemplate.getUser(String.valueOf(lecturerId));
                activity.getLecturer_names().add(user.getFirst_name() + " " + user.getLast_name());
            }
        }
    }

}
