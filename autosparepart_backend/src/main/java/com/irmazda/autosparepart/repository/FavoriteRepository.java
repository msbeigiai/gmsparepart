package com.irmazda.autosparepart.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.irmazda.autosparepart.entity.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

  List<Favorite> findByUser_UserId(UUID userId);

  @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END " +
      "FROM Favorite f WHERE f.user.userId = :userId AND f.product.productId = :productId")
  boolean existsByUserAndProduct(@Param("userId") UUID userId, @Param("productId") UUID productId);

  @Modifying
  @Query("DELETE FROM Favorite f WHERE f.user.userId = :userId AND f.product.productId = :productId")
  void deleteByUserAndProduct(@Param("userId") UUID userId, @Param("productId") UUID productId);

}
