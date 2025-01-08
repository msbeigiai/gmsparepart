package com.irmazda.autosparepart.repository;

import com.irmazda.autosparepart.entity.ReviewMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewMediaRepository extends JpaRepository<ReviewMedia, Long> {
  @Query(value = "SELECT * FROM review_media rm WHERE rm.review_id = :reviewId", nativeQuery = true)
  List<ReviewMedia> findByReviewId(Long reviewId);
}
