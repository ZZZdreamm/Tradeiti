package com.example.usos_oauth.offers.controller;

import com.example.usos_oauth.offers.model.dto.CommentDTO;
import com.example.usos_oauth.offers.service.CommentsService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/comments")
@Tag(name = "Operations on comments")
public class CommentsController {

    private CommentsService commentsService;

    @PostMapping("/create")
    public ResponseEntity<String> createComment(@RequestBody CommentDTO comment) {
        commentsService.addComment(comment);
        return ResponseEntity.ok("Comment created");
    }

    @GetMapping("/{offerId}")
    public List<CommentDTO> getComments(@PathVariable Long offerId) {
        return commentsService.getComments(offerId);
    }
}
