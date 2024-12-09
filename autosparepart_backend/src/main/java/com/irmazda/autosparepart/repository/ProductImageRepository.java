package com.irmazda.autosparepart.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.irmazda.autosparepart.entity.ProductImage;

public interface ProductImageRepository extends JpaRepository<ProductImage, UUID> {

}
