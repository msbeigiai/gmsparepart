package com.irmazda.autosparepart.repository;

import java.util.UUID;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.irmazda.autosparepart.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

  @Query("SELECT r FROM Review r WHERE r.productId = :productId AND r.status = 'PUBLISHED'")
  Page<Review> findByProductId(UUID productId, Pageable pageable);

  @Query("SELECT AVG(r.rating) FROM Review r WHERE r.productId = :productId AND r.status = 'PUBLISHED'")
  Double getAverageRating(UUID productId);

  @Query("SELECT r FROM Review r WHERE r.status = 'PENDING'")
  Page<Review> findPendingReviews(Pageable pageable);
}
