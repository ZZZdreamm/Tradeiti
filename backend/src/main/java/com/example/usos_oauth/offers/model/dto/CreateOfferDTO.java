package com.example.usos_oauth.offers.model.dto;

import com.example.usos_oauth.usos.model.dto.CourseDTO;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class CreateOfferDTO {

    private CourseDTO myCourse;
    private CourseDTO wantedCourse;
}
