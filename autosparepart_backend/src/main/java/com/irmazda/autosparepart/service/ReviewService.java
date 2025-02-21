package com.irmazda.autosparepart.service;

import com.irmazda.autosparepart.dto.review.ReviewDTO;
import com.irmazda.autosparepart.dto.review.ReviewRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import java.security.Principal;
import java.util.UUID;

public interface ReviewService {
  Page<ReviewDTO> getProductReviews(UUID productId, Pageable pageable);
  ReviewDTO createReview(UUID productId, ReviewRequest request, Principal principal);
}
