package com.irmazda.autosparepart.service;

import java.util.List;

import com.irmazda.autosparepart.dto.product.ProductRequestDTO;
import com.irmazda.autosparepart.dto.product.ProductResponseDTO;

public interface ProductService {
  ProductResponseDTO addProduct(ProductRequestDTO productRequestDTO);
  List<ProductResponseDTO> getAllProducts();
}
