package com.irmazda.autosparepart.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.irmazda.autosparepart.entity.ProductImage;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductImageRepository extends JpaRepository<ProductImage, UUID> {

  @Query(value = "SELECT * FROM product_images WHERE product_id := productId", nativeQuery = true)
  Optional<List<ProductImage>> findByProductId(@Param("productId") UUID productId);
}
