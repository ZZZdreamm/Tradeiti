package com.example.usos_oauth.offers.repository;

import com.example.usos_oauth.offers.model.dao.Offer;
import com.example.usos_oauth.offers.model.dao.OfferState;
import com.example.usos_oauth.security.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OfferRepository extends JpaRepository<Offer, Long> {

    List<Offer> findAllByOwner(User owner);

    List<Offer> findAllByReceiver(User receiver);

    List<Offer> findAllByState(OfferState state);

    List<Offer> findAllByOwnerAndState(User currentUser, OfferState state);
}

