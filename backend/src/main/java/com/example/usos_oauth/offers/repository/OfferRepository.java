package com.example.usos_oauth.offers.repository;

import com.example.usos_oauth.offers.model.dao.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfferRepository extends JpaRepository<Offer, Long> {
}
