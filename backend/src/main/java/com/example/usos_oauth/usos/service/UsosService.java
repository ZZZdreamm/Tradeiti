package com.example.usos_oauth.usos.service;

import com.example.usos_oauth.usos.api.UsosTemplate;
import lombok.AllArgsConstructor;
import org.springframework.web.client.HttpClientErrorException;

@AllArgsConstructor
public class UsosService {

    private UsosTemplate usosTemplate;

    public boolean testConnection() {
        try {
            usosTemplate.getUser();
            return true;
        } catch (HttpClientErrorException.Unauthorized e) {
            return false;
        }
    }

//    public List<UserCourse> getUserCourses() {
//        List<UserCourse> userCourses = Collections.emptyList();
//        List<CourseEdition> courseEditions = usosTemplate.getCourseEditions();
//        for (CourseEdition courseEdition : courseEditions) {
//            UserCourse userCourse = new UserCourse();
//            userCourse.setCourse_id(courseEdition.getCourse_id());
//            userCourse.setCourse_name(courseEdition.getCourse_name());
//            userCourse.setStart_time(courseEdition.getStart_time());
//            userCourse.setEnd_time(courseEdition.getEnd_time());
//            userCourse.setGroup_number(courseEdition.getGroup_number());
//            userCourse.setLecturers(courseEdition.getLecturers());
//            userCourses.add(userCourse);
//        }
//        return null;
//    }
}
