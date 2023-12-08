package com.example.usos_oauth.offers.model.dto;

import com.example.usos_oauth.offers.model.dao.OfferState;
import com.example.usos_oauth.usos.model.dto.CourseDTO;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class OfferDTO {

    private Long offerId;
    private String ownerUsername;
    private String receiverUsername;
    private OfferState state;
    private CourseDTO myCourse;
    private CourseDTO wantedCourse;
}
