package com.example.usos_oauth.offers.service;

import com.example.usos_oauth.offers.model.dao.Offer;
import com.example.usos_oauth.offers.model.dao.OfferState;
import com.example.usos_oauth.offers.model.dto.CreateOfferDTO;
import com.example.usos_oauth.offers.model.dto.OfferDTO;
import com.example.usos_oauth.offers.repository.OfferRepository;
import com.example.usos_oauth.offers.service.utils.OfferDTOMapper;
import com.example.usos_oauth.security.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class OfferService {

    private OfferRepository offerRepository;
    private UserService userService;

    public void createOffer(CreateOfferDTO createOffer) {
        Offer offer = new Offer();
        offer.setOwner(userService.getCurrentUser());
        offer.setState(OfferState.PENDING);
        offer.setMyCourse(OfferDTOMapper.mapToCourse(createOffer.getMyCourse()));
        offer.setWantedCourse(OfferDTOMapper.mapToCourse(createOffer.getWantedCourse()));
        offerRepository.save(offer);
    }

    public OfferDTO getOffer(Long id) {
        Offer offer = offerRepository.findById(id).orElseThrow();
        return OfferDTOMapper.mapToOfferDTO(offer);
    }
}
