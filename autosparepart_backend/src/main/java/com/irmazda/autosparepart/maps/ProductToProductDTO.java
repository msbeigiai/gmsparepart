package com.irmazda.autosparepart.maps;

import com.irmazda.autosparepart.dto.product.ProductDTO;
import com.irmazda.autosparepart.entity.Product;

public class ProductToProductDTO {
  public static ProductDTO mapFrom(Product product) {
    return new ProductDTO(
            product.getName(),
            product.getDescription(),
            product.getPrice(),
            product.getStockQuantity()
    );
  }
}
