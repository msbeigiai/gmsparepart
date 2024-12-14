package com.irmazda.autosparepart.service;

import com.irmazda.autosparepart.dto.product.ProductDTO;
import com.irmazda.autosparepart.dto.product.ProductRequestDTO;
import com.irmazda.autosparepart.dto.product.ProductResponseDTO;

import java.util.List;

public interface ProductService {
  ProductDTO addProduct(ProductRequestDTO productRequestDTO);

  List<ProductResponseDTO> getAllProducts();
}
