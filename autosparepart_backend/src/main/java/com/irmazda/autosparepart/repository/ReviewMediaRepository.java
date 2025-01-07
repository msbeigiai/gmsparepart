package com.irmazda.autosparepart.repository;

import com.irmazda.autosparepart.entity.ReviewMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ReviewMediaRepository extends JpaRepository<ReviewMedia, Long> {
  @Query("SELECT rm FROM ReviewMedia rm WHERE rm.review.id = :reviewId")
  List<ReviewMedia> findByReviewId(Long reviewId);
}
