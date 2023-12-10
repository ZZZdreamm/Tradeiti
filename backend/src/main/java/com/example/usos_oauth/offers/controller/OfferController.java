package com.example.usos_oauth.offers.controller;

import com.example.usos_oauth.offers.model.dao.OfferState;
import com.example.usos_oauth.offers.model.dto.CreateOfferDTO;
import com.example.usos_oauth.offers.model.dto.OfferDTO;
import com.example.usos_oauth.offers.service.OfferService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/offers")
public class OfferController {

    private OfferService offerService;

    @PostMapping("/create")
    public ResponseEntity<Long> createOffer(@RequestBody CreateOfferDTO offer) {
        return ResponseEntity.ok(offerService.createOffer(offer));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteOffer(@PathVariable Long id) {
        offerService.deleteOffer(id);
        return ResponseEntity.ok("Offer deleted");
    }

    @GetMapping("/owned")
    public List<OfferDTO> getUserOffers() {
        return offerService.getUserOffers();
    }

    @GetMapping("/received")
    public List<OfferDTO> getReceivedOffers() {
        return offerService.getReceivedOffers();
    }

    @GetMapping("/user/{state}")
    public List<OfferDTO> getPendingOffers(@PathVariable OfferState state) {
        return offerService.getUserOffersOfState(state);
    }

    @PatchMapping("/send-request/{id}")
    public ResponseEntity<String> sendRequest(@PathVariable Long id) {
        offerService.sendRequest(id);
        return ResponseEntity.ok("Request sent");
    }

    @PatchMapping("/accept/{id}")
    public ResponseEntity<String> acceptRequest(@PathVariable Long id) {
        offerService.acceptRequest(id);
        return ResponseEntity.ok("Request accepted");
    }

    @PatchMapping("/reject/{id}")
    public ResponseEntity<String> rejectRequest(@PathVariable Long id) {
        offerService.rejectRequest(id);
        return ResponseEntity.ok("Request rejected");
    }

}
