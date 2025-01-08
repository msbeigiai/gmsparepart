package com.irmazda.autosparepart.maps;

import com.irmazda.autosparepart.dto.review.ReviewDTO;
import com.irmazda.autosparepart.entity.Review;
import com.irmazda.autosparepart.entity.ReviewHelpfulness;
import com.irmazda.autosparepart.entity.ReviewMedia;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ReviewMapper {

  public ReviewMapper() {
  }

  public ReviewDTO toDTO(Review review, List<ReviewMedia> reviewMedias, List<ReviewHelpfulness> reviewHelpfulnesses) {
    List<String> mediaUrls = reviewMedias.stream().map(ReviewMedia::getMediaUrl).toList();
    int helpfulness = reviewHelpfulnesses.stream().filter(ReviewHelpfulness::isHelpful).toList().size();
    return new ReviewDTO(
            review.getId(),
            review.getProduct().getProductId(),
            review.getUser().getEmail(),
            review.getTitle(),
            review.getRating(),
            review.getReviewText(),
            review.isVerifiedPurchase(),
            mediaUrls,
            review.getCreatedAt(),
            review.getUpdatedAt(),
            helpfulness
    );
  }

}
