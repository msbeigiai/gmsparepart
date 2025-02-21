package com.irmazda.autosparepart.repository;

import com.irmazda.autosparepart.entity.ReviewHelpfulness;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewHelpfulnessRepository extends JpaRepository<ReviewHelpfulness, Long> {
  @Query(value = "SELECT * FROM review_helpfulness rh WHERE rh.review_id = :reviewId", nativeQuery = true)
  List<ReviewHelpfulness> findByReviewId(Long reviewId);
}
