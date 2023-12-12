package com.example.usos_oauth.offers.service;

import com.example.usos_oauth.offers.model.dao.Course;
import com.example.usos_oauth.offers.model.dao.Lecturer;
import com.example.usos_oauth.offers.model.dao.Offer;
import com.example.usos_oauth.offers.model.dao.OfferState;
import com.example.usos_oauth.offers.model.dto.CreateOfferRequest;
import com.example.usos_oauth.offers.model.dto.OfferDTO;
import com.example.usos_oauth.offers.repository.OfferRepository;
import com.example.usos_oauth.security.model.User;
import com.example.usos_oauth.usos.model.dto.CourseDTO;
import com.example.usos_oauth.usos.model.dto.GroupDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class OfferServiceTest {

    @InjectMocks
    private OfferService offerService;

    @Mock
    private OfferRepository offerRepository;

    @Test
    void createOffer() {
        Course myCourse = new Course();
        myCourse.setCourseId(1L);

        GroupDTO myGroupDTO = GroupDTO.builder()
                .groupNumber(1)
                .classTypeName("classTypeName")
                .lecturers(List.of("lecturer1", "lecturer2"))
                .startTime("startTime")
                .endTime("endTime")
                .weekday("weekday")
                .build();

        CourseDTO myCourseDTO = CourseDTO.builder()
                .courseId("123")
                .courseName("courseName")
                .groups(List.of(myGroupDTO))
                .build();

        Course wantedCourse = new Course();
        wantedCourse.setCourseId(2L);

        User owner = new User();
        owner.setId(1L);

        // use builder to build CreateOfferRequest
        CreateOfferRequest createOfferRequest = CreateOfferRequest.builder()
                .myCourse(myCourseDTO)
                .wantedCourse(myCourseDTO)
                .build();

        Long offerId = offerService.createOffer(createOfferRequest, owner);
        assertEquals(offerId, 0);
    }

    @Test
    void getOffer() {
        User owner = new User();
        owner.setId(1L);

        Lecturer lecturer1 = new Lecturer();

        Course myCourse = new Course();
        myCourse.setLecturers(List.of(lecturer1));

        Long offerId = 1L;
        Offer mockOffer = new Offer();
        mockOffer.setOfferId(offerId);
        mockOffer.setOwner(owner);
        mockOffer.setMyCourse(myCourse);
        mockOffer.setWantedCourse(myCourse);

        // Set up the mockOffer with necessary values for testing
        when(offerRepository.findById(any())).thenReturn(Optional.of(mockOffer));

        // Act
        OfferDTO offerDTO = offerService.getOffer(offerId);

        // Assert
        verify(offerRepository, times(1)).findById(offerId);
        assertEquals(offerDTO.getOfferId(), offerId);
    }

    @Test
    void getAllOffers() {
        // Arrange
        User owner = new User();
        owner.setId(1L);

        Lecturer lecturer1 = new Lecturer();

        Course myCourse = new Course();
        myCourse.setLecturers(List.of(lecturer1));

        Long offerId1 = 1L;
        Long offerId2 = 2L;

        Offer mockOffer1 = new Offer();
        mockOffer1.setOfferId(offerId1);
        mockOffer1.setOwner(owner);
        mockOffer1.setMyCourse(myCourse);
        mockOffer1.setWantedCourse(myCourse);

        Offer mockOffer2 = new Offer();
        mockOffer2.setOfferId(offerId2);
        mockOffer2.setOwner(owner);
        mockOffer2.setMyCourse(myCourse);
        mockOffer2.setWantedCourse(myCourse);

        // Set up the mockOffer with necessary values for testing
        when(offerRepository.findAll()).thenReturn(Arrays.asList(mockOffer1, mockOffer2));

        // Act
        List<OfferDTO> offerDTOs = offerService.getAllOffers();

        // Assert
        verify(offerRepository, times(1)).findAll();
        assertEquals(2, offerDTOs.size());
        assertEquals(offerId1, offerDTOs.get(0).getOfferId());
        assertEquals(offerId2, offerDTOs.get(1).getOfferId());
    }

    @Test
    void getOffersOfState() {
        // Arrange
        User owner = new User();
        owner.setId(1L);

        Lecturer lecturer1 = new Lecturer();

        Course myCourse = new Course();
        myCourse.setLecturers(List.of(lecturer1));

        Long offerId1 = 1L;
        Long offerId2 = 2L;

        OfferState targetState = OfferState.PENDING;
        OfferState otherState = OfferState.COMPLETED;

        Offer mockOffer1 = new Offer();
        mockOffer1.setOfferId(offerId1);
        mockOffer1.setOwner(owner);
        mockOffer1.setMyCourse(myCourse);
        mockOffer1.setWantedCourse(myCourse);
        mockOffer1.setState(targetState);

        Offer mockOffer2 = new Offer();
        mockOffer2.setOfferId(offerId2);
        mockOffer2.setOwner(owner);
        mockOffer2.setMyCourse(myCourse);
        mockOffer2.setWantedCourse(myCourse);
        mockOffer2.setState(otherState);

        // Set up the mockOffer with necessary values for testing
        when(offerRepository.findAllByState(targetState)).thenReturn(List.of(mockOffer1));

        // Act
        List<OfferDTO> offerDTOs = offerService.getOffersOfState(targetState);

        // Assert
        verify(offerRepository, times(1)).findAllByState(targetState);
        assertEquals(1, offerDTOs.size()); // Ensure that the list contains the expected number of elements

        // You may want to add more detailed assertions, depending on what you expect in each OfferDTO
        assertEquals(offerId1, offerDTOs.get(0).getOfferId());
    }
}