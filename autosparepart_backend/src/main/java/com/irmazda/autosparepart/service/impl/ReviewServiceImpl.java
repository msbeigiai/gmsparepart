package com.irmazda.autosparepart.service.impl;

import com.irmazda.autosparepart.dto.review.ReviewDTO;
import com.irmazda.autosparepart.dto.review.ReviewRequest;
import com.irmazda.autosparepart.entity.Review;
import com.irmazda.autosparepart.entity.ReviewHelpfulness;
import com.irmazda.autosparepart.entity.ReviewMedia;
import com.irmazda.autosparepart.entity.User;
import com.irmazda.autosparepart.entity.enums.OrderStatus;
import com.irmazda.autosparepart.entity.enums.ReviewStatus;
import com.irmazda.autosparepart.maps.ReviewMapper;
import com.irmazda.autosparepart.repository.*;
import com.irmazda.autosparepart.service.ReviewService;
import com.irmazda.autosparepart.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {

  private final UserService userService;
  private final ReviewRepository reviewRepository;
  private final ProductRepository productRepository;
  private final ReviewMapper reviewMapper;
  private final OrderRepository orderRepository;
  private final ReviewMediaRepository reviewMediaRepository;
  private final ReviewHelpfulnessRepository reviewHelpfulnessRepository;

  public ReviewServiceImpl(UserService userService,
                           ReviewRepository reviewRepository,
                           ProductRepository productRepository,
                           ReviewMapper reviewMapper,
                           OrderRepository orderRepository,
                           ReviewMediaRepository reviewMediaRepository, ReviewHelpfulnessRepository reviewHelpfulnessRepository) {
    this.userService = userService;
    this.reviewRepository = reviewRepository;
    this.productRepository = productRepository;
    this.reviewMapper = reviewMapper;
    this.orderRepository = orderRepository;
    this.reviewMediaRepository = reviewMediaRepository;
    this.reviewHelpfulnessRepository = reviewHelpfulnessRepository;
  }

  @Override
  public Page<ReviewDTO> getProductReviews(UUID productId, Pageable pageable) {
    Page<Review> reviews = reviewRepository.findByProductId(productId, pageable);
    return reviews.map(review -> {
      List<ReviewMedia> reviewMedias = reviewMediaRepository.findByReviewId(review.getId());
      List<ReviewHelpfulness> reviewHelpfulnesses = reviewHelpfulnessRepository.findByReviewId(review.getId());
      return reviewMapper.toDTO(review, reviewMedias, reviewHelpfulnesses);
    });
  }

  @Override
  public ReviewDTO createReview(UUID productId, ReviewRequest request, Principal principal) {
    User currentUser = userService.getUserFromPrincipal(principal);
    Review review = new Review(
            productRepository.getReferenceById(productId),
            currentUser,
            request.getRating(),
            request.getTitle(),
            request.getReviewText(),
            checkVerifiedPurchase(productId, currentUser),
            ReviewStatus.PENDING,
            List.of(),
            List.of()
    );

    review = reviewRepository.save(review);
    return reviewMapper.toDTO(review, List.of(), List.of());
  }

  private boolean checkVerifiedPurchase(UUID productId, User user) {
    LocalDateTime sixMonthsAgo = LocalDateTime.now().minusMonths(6);
    return orderRepository.existsByUserIdAndProductIdAndOrderDateAfterAndStatus(
            user.getUserId(), productId, sixMonthsAgo, OrderStatus.COMPLETED);
  }
}
