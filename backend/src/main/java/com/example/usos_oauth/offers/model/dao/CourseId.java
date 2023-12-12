package com.example.usos_oauth.offers.model.dao;

import lombok.Data;

import java.io.Serializable;

@Data
public class CourseId implements Serializable {

    private String courseId;
    private int groupNumber;
}
