package com.example.usos_oauth.usos.model.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class GroupDTO {

    private int groupNumber;
    private String classTypeName;
    private List<String> lecturers;
    private String startTime;
    private String endTime;
    private String weekday;
}
