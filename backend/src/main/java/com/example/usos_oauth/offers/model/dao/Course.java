package com.example.usos_oauth.offers.model.dao;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "course")
@IdClass(CourseId.class)
public class Course {

    @Id
    private String courseId;
    @Id
    private int groupNumber;

    private String name;
    private String weekDay;
    private String startHour;
    private String endHour;
    private String classTypeName;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Lecturer> lecturers;
}