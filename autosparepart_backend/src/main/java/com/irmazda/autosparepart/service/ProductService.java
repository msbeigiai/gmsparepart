package com.irmazda.autosparepart.service;

import com.irmazda.autosparepart.dto.product.AddProductDTO;
import com.irmazda.autosparepart.dto.product.GetProductDTO;
import com.irmazda.autosparepart.dto.product.ProductCreateRequest;

import java.util.List;
import java.util.UUID;

public interface ProductService {
  List<GetProductDTO> getAllProducts();

  GetProductDTO getProductById(UUID productId);

  Long getProductCategoryCount(Long categoryId);

  List<AddProductDTO> getProductsByCategory(Long categoryId);

  List<AddProductDTO> getByCategoryIds(List<Long> categoryIds);
}
