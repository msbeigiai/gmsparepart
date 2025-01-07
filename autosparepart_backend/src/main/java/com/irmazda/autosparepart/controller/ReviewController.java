package com.irmazda.autosparepart.controller;

import com.irmazda.autosparepart.dto.review.ReviewDTO;
import com.irmazda.autosparepart.service.ReviewService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {
  private final ReviewService reviewService;

  public ReviewController(ReviewService reviewService) {
    this.reviewService = reviewService;
  }

  @GetMapping("/products/{productId}")
  public ResponseEntity<Page<ReviewDTO>> getProductReviews(@PathVariable UUID productId,
                                                           @PageableDefault(size = 20) Pageable pageable) {
    return ResponseEntity.ok(reviewService.getProductReviews(productId, pageable));
  }
}
