package com.irmazda.autosparepart.repository;

import com.irmazda.autosparepart.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {

  @Query(value = "SELECT COUNT(*) FROM products WHERE category_id = :categoryId", nativeQuery = true)
  Long getProductCategoryCount(@Param("categoryId") Long categoryId);

  @Query(value = "SELECT *  FROM products WHERE category_id = :categoryId", nativeQuery = true)
  List<Product> getProductsByCategoryId(@Param("categoryId") Long categoryId);

  @Query(value = "SELECT * FROM products WHERE (:categoryIds IS NULL OR category_id IN :categoryIds)", nativeQuery = true)
  List<Product> findByCategoryIds(@Param("categoryIds") List<Long> categoryIds);
}
