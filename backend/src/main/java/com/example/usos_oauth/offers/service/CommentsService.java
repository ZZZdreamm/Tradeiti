package com.example.usos_oauth.offers.service;

import com.example.usos_oauth.offers.model.dao.Comment;
import com.example.usos_oauth.offers.model.dao.Offer;
import com.example.usos_oauth.offers.model.dto.CommentDTO;
import com.example.usos_oauth.offers.repository.OfferRepository;
import com.example.usos_oauth.security.model.User;
import com.example.usos_oauth.security.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CommentsService {

    private OfferRepository offerRepository;
    private UserService userService;

    public void addComment(CommentDTO commentDTO) {
        Long offerId = commentDTO.getOfferId();
        Offer offer = offerRepository.findById(offerId).orElseThrow();
        List<Comment> comments = offer.getComments();
        User currentUser = userService.getCurrentUser();
        Comment comment = Comment.builder()
                .user(currentUser)
                .content(commentDTO.getText())
                .date(commentDTO.getDate())
                .build();
        comments.add(comment);
        offer.setComments(comments);
        offerRepository.save(offer);
    }

    public List<CommentDTO> getComments(Long offerId) {
        Offer offer = offerRepository.findById(offerId).orElseThrow();
        return offer.getComments().stream()
                .map(comment -> CommentDTO.builder()
                        .text(comment.getContent())
                        .date(comment.getDate())
                        .username(comment.getUser().getUsername())
                        .offerId(offerId)
                        .build())
                .toList();
    }
}
