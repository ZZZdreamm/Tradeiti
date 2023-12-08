package com.example.usos_oauth.offers.model.dao;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "course")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "course_seq")
    @SequenceGenerator(name = "course_seq", allocationSize = 1)
    private long courseId;
    private int groupNumber;
    private String name;
    private String weekDay;
    private String startHour;
    private String endHour;
    private String courseFullName;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Lecturer> lecturers;
}