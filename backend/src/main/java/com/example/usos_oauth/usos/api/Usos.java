package com.example.usos_oauth.usos.api;

import com.example.usos_oauth.usos.api.impl.model.CourseEdition;
import org.springframework.social.ApiBinding;

import java.util.List;

public interface Usos extends ApiBinding {

    List<CourseEdition> getCourseEditions();
}
