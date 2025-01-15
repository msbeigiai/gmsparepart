package com.irmazda.autosparepart.maps;

import com.irmazda.autosparepart.dto.product.ProductDTO;
import com.irmazda.autosparepart.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {
  public ProductDTO mapTo(Product product) {
    ProductDTO productDTO = new ProductDTO();
    productDTO.setProductId(product.getProductId());
    productDTO.setDescription(product.getDescription());
    productDTO.setName(product.getName());
    productDTO.setPrice(product.getPrice());
    productDTO.setStockQuantity(product.getStockQuantity());
    productDTO.setImage(product.getImages().getFirst().getUrl());
    productDTO.setCategoryId(product.getCategory().getCategoryId());
    productDTO.setCategoryName(product.getCategory().getName());
    return productDTO;
  }
}
