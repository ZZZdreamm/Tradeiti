package com.example.usos_oauth.offers.model.dao;

import com.example.usos_oauth.security.model.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "offer")
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "offer_seq")
    @SequenceGenerator(name = "offer_seq", allocationSize = 1)
    private long offerId;
    @ManyToOne
    private User owner;
    @ManyToOne
    private User receiver;
    @Enumerated(EnumType.STRING)
    private OfferState state = OfferState.PENDING;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Course myCourse;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Course wantedCourse;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Comment> comments;
}
