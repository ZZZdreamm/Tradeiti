package com.example.usos_oauth.offers.model.dto;

import com.example.usos_oauth.offers.model.dao.OfferState;
import com.example.usos_oauth.usos.model.dto.CourseDTO;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OfferDTO {

    private Long offerId;
    private String ownerUsername;
    private String receiverUsername;
    private OfferState state;
    private CourseDTO myCourse;
    private CourseDTO wantedCourse;
}
