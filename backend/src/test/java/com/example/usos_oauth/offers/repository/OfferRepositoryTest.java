package com.example.usos_oauth.offers.repository;

import com.example.usos_oauth.offers.model.dao.Offer;
import com.example.usos_oauth.offers.model.dao.OfferState;
import com.example.usos_oauth.security.model.Role;
import com.example.usos_oauth.security.model.User;
import com.example.usos_oauth.security.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

@DataJpaTest
class OfferRepositoryTest {

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    void findAllByOwner() {
        // Given
        Offer offer = new Offer();

        User owner = new User();
        owner.setUsername("owner");
        owner.setPassword("password");
        owner.setRole(Role.USER);
        userRepository.save(owner);
        offer.setOwner(owner);

        User receiver = new User();
        receiver.setUsername("receiver");
        receiver.setPassword("password");
        receiver.setRole(Role.USER);
        userRepository.save(receiver);
        offer.setReceiver(receiver);

        offerRepository.save(offer);

        // When
        List<Offer> ownerOffers = offerRepository.findAllByOwner(owner);

        // Then
        assert ownerOffers.size() == 1;
        assert ownerOffers.get(0).getOwner().getUsername().equals("owner");
        assert ownerOffers.get(0).getReceiver().getUsername().equals("receiver");
    }

    @Test
    void findAllByReceiver() {
        // Given
        Offer offer = new Offer();

        User owner = new User();
        owner.setUsername("owner");
        owner.setPassword("password");
        owner.setRole(Role.USER);
        userRepository.save(owner);
        offer.setOwner(owner);

        User receiver = new User();
        receiver.setUsername("receiver");
        receiver.setPassword("password");
        receiver.setRole(Role.USER);
        userRepository.save(receiver);
        offer.setReceiver(receiver);

        offerRepository.save(offer);

        // When
        List<Offer> receiverOffers = offerRepository.findAllByReceiver(receiver);

        // Then
        assert receiverOffers.size() == 1;
        assert receiverOffers.get(0).getOwner().getUsername().equals("owner");
        assert receiverOffers.get(0).getReceiver().getUsername().equals("receiver");
    }

    @Test
    void findAllByState() {
        // Given
        Offer offer = new Offer();

        User owner = new User();
        owner.setUsername("owner");
        owner.setPassword("password");
        owner.setRole(Role.USER);
        userRepository.save(owner);
        offer.setOwner(owner);

        User receiver = new User();
        receiver.setUsername("receiver");
        receiver.setPassword("password");
        receiver.setRole(Role.USER);
        userRepository.save(receiver);
        offer.setReceiver(receiver);

        offerRepository.save(offer);

        // When
        List<Offer> pendingOffers = offerRepository.findAllByState(OfferState.PENDING);

        // Then
        assert pendingOffers.size() == 1;
        assert pendingOffers.get(0).getOwner().getUsername().equals("owner");
        assert pendingOffers.get(0).getReceiver().getUsername().equals("receiver");
    }

    @Test
    void findAllByStateAndOwner() {
        // Given
        Offer offer = new Offer();

        User owner = new User();
        owner.setUsername("owner");
        owner.setPassword("password");
        owner.setRole(Role.USER);
        userRepository.save(owner);
        offer.setOwner(owner);

        User receiver = new User();
        receiver.setUsername("receiver");
        receiver.setPassword("password");
        receiver.setRole(Role.USER);
        userRepository.save(receiver);
        offer.setReceiver(receiver);

        offerRepository.save(offer);

        // When
        List<Offer> pendingOffers = offerRepository.findAllByOwnerAndState(owner, OfferState.PENDING);

        // Then
        assert pendingOffers.size() == 1;
        assert pendingOffers.get(0).getOwner().getUsername().equals("owner");
        assert pendingOffers.get(0).getReceiver().getUsername().equals("receiver");
    }

    @Test
    void findAllByOwnerNoOffers(){
        Offer offer = new Offer();
        offerRepository.save(offer);

        User someUser = new User();
        someUser.setUsername("someUser");
        someUser.setPassword("password");
        someUser.setRole(Role.USER);
        userRepository.save(someUser);

        List<Offer> offers = offerRepository.findAllByOwner(someUser);

        assert offers.size() == 0;
    }

    @Test
    void findMultipleOffersByOwner(){
        Offer offer = new Offer();
        offerRepository.save(offer);

        Offer offer2 = new Offer();
        offerRepository.save(offer2);

        User someUser = new User();
        someUser.setUsername("someUser");
        someUser.setPassword("password");
        someUser.setRole(Role.USER);
        userRepository.save(someUser);

        offer.setOwner(someUser);
        offer2.setOwner(someUser);

        List<Offer> offers = offerRepository.findAllByOwner(someUser);

        assert offers.size() == 2;
        assert offers.get(0).getOwner().getUsername().equals("someUser");
        assert offers.get(1).getOwner().getUsername().equals("someUser");
    }
}