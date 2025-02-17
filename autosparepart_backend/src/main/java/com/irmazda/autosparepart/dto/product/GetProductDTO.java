package com.irmazda.autosparepart.dto.product;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public class GetProductDTO extends AddProductDTO {
  private List<String> imageUrls;

  public GetProductDTO() {
  }

  public GetProductDTO(UUID productId,
                       String name,
                       String description,
                       BigDecimal price,
                       int stockQuantity,
                       Long categoryId,
                       String categoryName,
                       List<String> imageUrls,
                       String brand,
                       String manufacturer,
                       String compatibility) {
    super(productId, name, description, price, stockQuantity, categoryId, categoryName, brand, manufacturer, compatibility);
    this.imageUrls = imageUrls;
  }

  public List<String> getImageUrls() {
    return imageUrls;
  }

  public void setImageUrls(List<String> imageUrls) {
    this.imageUrls = imageUrls;
  }
}
