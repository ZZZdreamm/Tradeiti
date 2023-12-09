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

    @DeleteMapping("/all/delete")
    public ResponseEntity<String> deleteAllOffers() {
        offerService.deleteAllOffers();
        return ResponseEntity.ok("All offers deleted");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteOffer(@PathVariable Long id) {
        offerService.deleteOffer(id);
        return ResponseEntity.ok("Offer deleted");
    }

    @GetMapping("/all")
    public List<OfferDTO> getAllOffers() {
        return offerService.getAllOffers();
    }

    @GetMapping("/all/user")
    public List<OfferDTO> getUserOffers() {
        return offerService.getUserOffers();
    }

    @GetMapping("/all/received")
    public List<OfferDTO> getReceivedOffers() {
        return offerService.getReceivedOffers();
    }

    @GetMapping("/all/pending")
    public List<OfferDTO> getPendingOffers() {
        return offerService.getOffersOfState(OfferState.PENDING);
    }

    @PatchMapping("/accept/{id}")
    public ResponseEntity<String> acceptOffer(@PathVariable Long id) {
        offerService.acceptOffer(id);
        return ResponseEntity.ok("Offer accepted");
    }

    @PatchMapping("/reject/{id}")
    public ResponseEntity<String> rejectOffer(@PathVariable Long id) {
        offerService.rejectOffer(id);
        return ResponseEntity.ok("Offer rejected");
    }

}
