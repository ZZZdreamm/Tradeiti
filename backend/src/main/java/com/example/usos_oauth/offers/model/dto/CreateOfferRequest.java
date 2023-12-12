package com.example.usos_oauth.offers.model.dto;

import com.example.usos_oauth.usos.model.dto.CourseDTO;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class CreateOfferRequest {
    private CourseDTO myCourse;
    private CourseDTO wantedCourse;
}
