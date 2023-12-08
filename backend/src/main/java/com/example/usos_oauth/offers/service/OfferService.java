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

import java.util.List;

@AllArgsConstructor
@Service
public class OfferService {

    private OfferRepository offerRepository;
    private UserService userService;

    public Long createOffer(CreateOfferDTO createOffer) {
        Offer offer = new Offer();
        offer.setOwner(userService.getCurrentUser());
        offer.setMyCourse(OfferDTOMapper.mapToCourse(createOffer.getMyCourse()));
        offer.setWantedCourse(OfferDTOMapper.mapToCourse(createOffer.getWantedCourse()));
        offerRepository.save(offer);
        return offer.getOfferId();
    }

    public OfferDTO getOffer(Long id) {
        Offer offer = offerRepository.findById(id).orElseThrow();
        return OfferDTOMapper.mapToOfferDTO(offer);
    }

    public List<OfferDTO> getAllOffers() {
        List<Offer> offers = offerRepository.findAll();
        return offers.stream()
                .map(OfferDTOMapper::mapToOfferDTO)
                .toList();
    }

    public List<OfferDTO> getUserOffers() {
        List<Offer> offers = offerRepository.findAllByOwner(userService.getCurrentUser());
        return offers.stream()
                .map(OfferDTOMapper::mapToOfferDTO)
                .toList();
    }

    public List<OfferDTO> getReceivedOffers() {
        List<Offer> offers = offerRepository.findAllByReceiver(userService.getCurrentUser());
        return offers.stream()
                .map(OfferDTOMapper::mapToOfferDTO)
                .toList();
    }

    public List<OfferDTO> getOffersOfState(OfferState state) {
        List<Offer> offers = offerRepository.findAllByState(state);
        return offers.stream()
                .map(OfferDTOMapper::mapToOfferDTO)
                .toList();
    }

    public void deleteAllOffers() {
        offerRepository.deleteAll();
    }
}
