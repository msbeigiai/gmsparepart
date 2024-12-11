package com.irmazda.autosparepart.maps;

import com.irmazda.autosparepart.dto.product.ProductImageDTO;
import com.irmazda.autosparepart.entity.ProductImage;

public class ProductImageDTOToProductImage {
  public static ProductImage mapFrom(ProductImageDTO dto) {
    ProductImage productImage = new ProductImage();
    productImage.setProduct(dto.getProduct());
    productImage.setMainImage(productImage.isMainImage());
    productImage.setUrl(productImage.getUrl());
    productImage.setAltText(dto.getAltText());
    return productImage;
  }
}
