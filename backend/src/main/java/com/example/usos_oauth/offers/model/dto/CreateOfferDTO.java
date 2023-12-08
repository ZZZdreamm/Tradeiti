package com.example.usos_oauth.offers.model.dto;

import com.example.usos_oauth.usos.model.dto.CourseDTO;
import lombok.Data;

@Data
public class CreateOfferDTO {

    private CourseDTO myCourse;
    private CourseDTO wantedCourse;
}
