package com.example.usos_oauth.usos.model.usos;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Activity {
    private String courseId;
    private int groupNumber;
    private String startTime;
    private String endTime;
    private LangDict courseName;
    private List<Long> lecturerIds;
    private LangDict classtypeName;
    private List<String> lecturerNames = new ArrayList<>();
    private String weekday = "";
}
