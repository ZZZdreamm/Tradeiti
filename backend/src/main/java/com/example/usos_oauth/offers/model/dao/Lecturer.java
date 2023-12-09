package com.example.usos_oauth.offers.model.dao;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "lecturer")
public class Lecturer {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "lecturer_seq")
    @SequenceGenerator(name = "lecturer_seq", allocationSize = 1)
    private long lecturerId;
    private String lecturerName;
}
