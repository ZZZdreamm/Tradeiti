package com.example.usos_oauth.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
public class CustomRequestToken {
    @Id
    @SequenceGenerator(
            name = "request_id_sequence",
            sequenceName = "request_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "request_id_sequence"
    )
    private Integer id;
    private String requestToken;
    private String requestTokenSecret;
}
