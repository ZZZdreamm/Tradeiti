package com.example.usos_oauth.offers.service;

import com.example.usos_oauth.offers.repository.OfferRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class OfferServiceTest {

    @InjectMocks
    private OfferService offerService;

    @Mock
    private OfferRepository offerRepository;

    @BeforeEach
    void setUp() {
    }

    @Test
    void createOffer() {
    }

    @Test
    void getOffer() {
    }

    @Test
    void getAllOffers() {
    }

    @Test
    void getOffersOfState() {
    }

    @Test
    void getOffersWithUserOfState() {
    }

    @Test
    void deleteOffer() {
    }



}