package com.irmazda.autosparepart.dto.favorite;

public class FavoriteDTO {
  private String productId;

  public FavoriteDTO() {
  }

  public FavoriteDTO(String productId) {
    this.productId = productId;
  }

  public String getProductId() {
    return productId;
  }

  public void setProductId(String productId) {
    this.productId = productId;
  }
}
