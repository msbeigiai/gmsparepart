package com.irmazda.autosparepart.service;

import com.irmazda.autosparepart.dto.product.ProductDTO;
import com.irmazda.autosparepart.dto.product.ProductRequest;

import java.util.List;
import java.util.UUID;

public interface ProductService {
  ProductDTO addProduct(ProductRequest productRequestDTO);

  List<ProductDTO> getAllProducts();

  ProductDTO getProductById(UUID productId);

  Long getProductCategoryCount(Long categoryId);

  List<ProductDTO> getProductsByCategory(Long categoryId);
}
