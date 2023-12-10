package com.example.usos_oauth.offers.model.dto;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class CommentDTO {

    private Long offerId;
    private String username;
    private String text;
    private String date;
}
