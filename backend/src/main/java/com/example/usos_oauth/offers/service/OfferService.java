package com.example.usos_oauth.offers.service;

import com.example.usos_oauth.offers.model.dao.Offer;
import com.example.usos_oauth.offers.model.dao.OfferState;
import com.example.usos_oauth.offers.model.dto.CreateOfferDTO;
import com.example.usos_oauth.offers.model.dto.OfferDTO;
import com.example.usos_oauth.offers.repository.OfferRepository;
import com.example.usos_oauth.offers.service.utils.OfferDTOMapper;
import com.example.usos_oauth.security.model.User;
import com.example.usos_oauth.security.service.UserService;
import com.example.usos_oauth.usos.service.connect.UsosServiceAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class OfferService {

    private OfferRepository offerRepository;
    private UserService userService;
    private UsosServiceAuthorizer usosServiceAuthorizer;

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

    public List<OfferDTO> getUserOffersOfState(OfferState state) {
        List<String> userCoursesIds = usosServiceAuthorizer.getUsosService().getUserCoursesIds();
        List<OfferDTO> offers = getOffersOfState(state);
        return offers.stream()
                .filter(offer -> userCoursesIds.contains(offer.getMyCourse().getCourseId()))
                .toList();
    }

    public List<OfferDTO> getOffersOfState(OfferState state) {
        List<Offer> offers = offerRepository.findAllByState(state);
        return offers.stream()
                .map(OfferDTOMapper::mapToOfferDTO)
                .toList();
    }

    public void deleteOffer(Long id) {
        assertCurrentUserIsOwner(id);
        offerRepository.deleteById(id);
    }

    public void sendRequest(Long id) {
        assertCurrentUserIsNotOwner(id);
        updateOfferState(id, OfferState.REQUEST_SENT);
        updateOfferReceiver(id, userService.getCurrentUser());
    }

    public void acceptRequest(Long id) {
        assertCurrentUserIsOwner(id);
        updateOfferState(id, OfferState.COMPLETED);
    }

    public void rejectRequest(Long id) {
        assertCurrentUserIsOwner(id);
        updateOfferState(id, OfferState.PENDING);
        updateOfferReceiver(id, null);
    }

    private void updateOfferState(Long id, OfferState state) {
        Offer offer = offerRepository.findById(id).orElseThrow();
        offer.setState(state);
        offerRepository.save(offer);
    }

    private void updateOfferReceiver(Long id, User receiver) {
        Offer offer = offerRepository.findById(id).orElseThrow();
        offer.setReceiver(receiver);
        offerRepository.save(offer);
    }

    private void assertCurrentUserIsOwner(Long id) {
        assertUserIsOwner(id, userService.getCurrentUser());
    }

    private void assertCurrentUserIsNotOwner(Long id) {
        assertUserIsNotOwner(id, userService.getCurrentUser());
    }

    private void assertUserIsNotOwner(Long id, User user) {
        Offer offer = offerRepository.findById(id).orElseThrow();
        if (offer.getOwner().equals(user)) {
            throw new RuntimeException("User is the owner of the offer");
        }
    }

    private void assertUserIsOwner(Long id, User user) {
        Offer offer = offerRepository.findById(id).orElseThrow();
        if (!offer.getOwner().equals(user)) {
            throw new RuntimeException("User is not the owner of the offer");
        }
    }
}
