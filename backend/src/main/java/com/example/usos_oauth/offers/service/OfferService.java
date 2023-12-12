package com.example.usos_oauth.offers.service;

import com.example.usos_oauth.offers.model.dao.Offer;
import com.example.usos_oauth.offers.model.dao.OfferState;
import com.example.usos_oauth.offers.model.dto.CreateOfferRequest;
import com.example.usos_oauth.offers.model.dto.OfferDTO;
import com.example.usos_oauth.offers.repository.OfferRepository;
import com.example.usos_oauth.offers.service.exception.OperationForbiddenException;
import com.example.usos_oauth.offers.service.utils.OfferDTOMapper;
import com.example.usos_oauth.security.model.User;
import com.example.usos_oauth.security.service.UserService;
import com.example.usos_oauth.usos.model.dto.CourseDTO;
import com.example.usos_oauth.usos.service.connect.UsosServiceAuthorizer;
import com.example.usos_oauth.usos.service.usos.UsosService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

@AllArgsConstructor
@Service
public class OfferService {

    private OfferRepository offerRepository;
    private UserService userService;
    private UsosServiceAuthorizer usosServiceAuthorizer;

    public Long createOfferForCurrentUser(CreateOfferRequest createOffer) {
        User owner = userService.getCurrentUser();
        return createOffer(createOffer, owner);
    }

    public Long createOffer(CreateOfferRequest createOffer, User owner) {
        Offer offer = new Offer();
        offer.setOwner(owner);
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

    public List<OfferDTO> getOwnedOffers() {
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

    public List<OfferDTO> getOffersMatchingUserCourses(OfferState state, boolean areGroupsFiltered) {
        UsosService usosService = usosServiceAuthorizer.getUsosService();
        List<CourseDTO> userCourses = usosService.getCurrentUserCourses();
        List<OfferDTO> offers = getOffersOfState(state);
        return offers.stream()
                .filter(offer -> {
                    String courseId = offer.getWantedCourse().getCourseId();
                    return userCourses.stream()
                            .anyMatch(course -> course.getCourseId().equals(courseId));
                })
                .filter(offer -> {
                    if (areGroupsFiltered) {
                        String wantedCourseId = offer.getWantedCourse().getCourseId();
                        int wantedGroupNumber = offer.getWantedCourse().getGroups().get(0).getGroupNumber();
                        return userCourses.stream()
                                .filter(course -> course.getCourseId().equals(wantedCourseId))
                                .anyMatch(course -> course.getGroups().stream()
                                        .anyMatch(group -> group.getGroupNumber() == wantedGroupNumber));
                    }
                    return true;
                })
                .toList();
    }

    public List<OfferDTO> getOffersOfState(OfferState state) {
        List<Offer> offers = offerRepository.findAllByState(state);
        return offers.stream()
                .map(OfferDTOMapper::mapToOfferDTO)
                .toList();
    }

    public List<OfferDTO> getOffersWithUserOfState(OfferState state) {
        List<OfferDTO> ownedOffers = getOwnedOffers();
        List<OfferDTO> receivedOffers = getReceivedOffers();
        return Stream.of(ownedOffers, receivedOffers)
                .flatMap(List::stream)
                .filter(offer -> offer.getState().equals(state))
                .toList();
    }

    public void deleteOffer(Long id) {
        assertCurrentUserIsOwner(id);
        offerRepository.deleteById(id);
    }

    public void sendRequest(Long id) {
        assertCurrentUserIsNotOwner(id);
        assertCurrentUserHasRequiredGroup(id);
        updateOfferState(id, OfferState.REQUEST_SENT);
        updateOfferReceiver(id, userService.getCurrentUser());
    }

    private void assertCurrentUserHasRequiredGroup(Long id) {
        Offer offer = offerRepository.findById(id).orElseThrow();
        String wantedCourseId = offer.getWantedCourse().getUsosCourseId();
        int wantedGroupNumber = offer.getWantedCourse().getGroupNumber();
        if (!usosServiceAuthorizer.getUsosService().IsCurrentUserInGroup(wantedCourseId, wantedGroupNumber)) {
            throw new OperationForbiddenException();
        }
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
            throw new OperationForbiddenException();
        }
    }

    private void assertUserIsOwner(Long id, User user) {
        Offer offer = offerRepository.findById(id).orElseThrow();
        if (!offer.getOwner().equals(user)) {
            throw new OperationForbiddenException();
        }
    }
}
