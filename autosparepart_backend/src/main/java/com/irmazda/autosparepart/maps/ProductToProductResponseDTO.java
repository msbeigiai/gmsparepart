package com.irmazda.autosparepart.maps;

import com.irmazda.autosparepart.dto.product.ProductResponseDTO;
import com.irmazda.autosparepart.entity.Product;

public class ProductToProductResponseDTO {
  public static ProductResponseDTO mapFrom(Product product) {
    ProductResponseDTO productResponseDTO = new ProductResponseDTO();

    productResponseDTO.setDescription(product.getDescription());
    productResponseDTO.setName(product.getName());
    productResponseDTO.setPrice(product.getPrice());
    productResponseDTO.setStockQuantity(product.getStockQuantity());

    return productResponseDTO;
  }
}
