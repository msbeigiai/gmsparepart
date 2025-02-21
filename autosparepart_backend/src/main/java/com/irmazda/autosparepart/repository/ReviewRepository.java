package com.irmazda.autosparepart.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.irmazda.autosparepart.entity.Review;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Long> {

  @Query(value = "SELECT * FROM reviews r WHERE r.product_id = :productId AND r.status = 'PUBLISHED'", nativeQuery = true)
  Page<Review> findByProductId(@Param("productId") UUID productId, Pageable pageable);

  @Query("SELECT AVG(r.rating) FROM Review r WHERE r.product.productId = :productId AND r.status = 'PUBLISHED'")
  Double getAverageRating(UUID productId);

  @Query("SELECT r FROM Review r WHERE r.status = 'PENDING'")
  Page<Review> findPendingReviews(Pageable pageable);
}
