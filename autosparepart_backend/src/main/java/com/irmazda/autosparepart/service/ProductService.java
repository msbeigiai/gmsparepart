package com.irmazda.autosparepart.service;

import com.irmazda.autosparepart.dto.product.ProductDTO;
import com.irmazda.autosparepart.dto.product.ProductRequestDTO;
import com.irmazda.autosparepart.dto.product.ProductResponseDTO;

import java.util.List;
import java.util.UUID;

public interface ProductService {
  ProductDTO addProduct(ProductRequestDTO productRequestDTO);

  List<ProductResponseDTO> getAllProducts();
  ProductResponseDTO getProductById(UUID productId);
}
