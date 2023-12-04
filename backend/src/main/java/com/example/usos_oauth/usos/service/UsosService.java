package com.example.usos_oauth.usos.service;

import com.example.usos_oauth.usos.api.UsosTemplate;
import com.example.usos_oauth.usos.api.logic.Term;
import com.example.usos_oauth.usos.api.model.Activity;
import com.example.usos_oauth.usos.api.model.CourseEdition;
import com.example.usos_oauth.usos.api.model.UsosUser;
import com.example.usos_oauth.usos.service.exception.UsosAccountNotConnectedException;
import com.example.usos_oauth.usos.service.model.CourseDTO;
import com.example.usos_oauth.usos.service.model.GroupDTO;
import lombok.AllArgsConstructor;
import org.springframework.web.client.HttpClientErrorException;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public List<CourseDTO> getUserActiveCourses() {
        assertUserIsConnected();
        String currentTerm = Term.getCurrentAcademicTerm();
        List<CourseEdition> currentCourseEdition = usosTemplate.getUserCourseEditions().get(currentTerm);
        return currentCourseEdition.stream()
                .map(UsosDTOMapper::mapToCourseDTO)
                .toList();
    }
    public List<GroupDTO> getCourseGroups(String course_id) {
        assertUserIsConnected();
        String currentTerm = Term.getCurrentAcademicTerm();
        List<Activity> activities = usosTemplate.getCourseActivities(course_id, currentTerm);
        activities = removeLectures(activities);
        updateLecturer(activities);
        parseDateTime(activities);
        return activities.stream()
                .map(UsosDTOMapper::mapToGroupDTO)
                .toList();
    }

    private List<Activity> removeLectures(List<Activity> activities) {
        return activities.stream()
                .filter(activity -> !activity.getClasstype_name().getPl().equals("Wykład"))
                .toList();
    }

    private List<Activity> parseDateTime(List<Activity> activities) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("HH:mm");

        // Mapping between English and Polish weekday names
        Map<String, String> weekdayMapping = new HashMap<>();
        weekdayMapping.put("MONDAY", "Poniedziałek");
        weekdayMapping.put("TUESDAY", "Wtorek");
        weekdayMapping.put("WEDNESDAY", "Środa");
        weekdayMapping.put("THURSDAY", "Czwartek");
        weekdayMapping.put("FRIDAY", "Piątek");
        weekdayMapping.put("SATURDAY", "Sobota");
        weekdayMapping.put("SUNDAY", "Niedziela");

        for (Activity activity : activities) {
            LocalDateTime startTime = LocalDateTime.parse(activity.getStart_time(), formatter);
            DayOfWeek dayOfWeek = startTime.getDayOfWeek();
            String polishWeekday = weekdayMapping.get(dayOfWeek.name());
            activity.setWeekday(polishWeekday);
            String formattedTime = startTime.format(outputFormatter);
            activity.setStart_time(formattedTime);
            LocalDateTime endTime = LocalDateTime.parse(activity.getEnd_time(), formatter);
            String formattedEndTime = endTime.format(outputFormatter);
            activity.setEnd_time(formattedEndTime);
        }

        return activities;
    }

    private List<Activity> updateLecturer(List<Activity> activities) {
        for (Activity activity : activities) {
            List<Long> lecturerIds = activity.getLecturer_ids();
            for (Long lecturerId : lecturerIds) {
                UsosUser user = usosTemplate.getUser(String.valueOf(lecturerId));
                assert user != null;
                activity.getLecturer_names().add(user.getFirst_name() + " " + user.getLast_name());
            }
        }
        return activities;
    }

}
