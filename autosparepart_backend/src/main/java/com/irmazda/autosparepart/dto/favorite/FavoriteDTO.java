package com.irmazda.autosparepart.dto.favorite;

import java.math.BigDecimal;

public class FavoriteDTO {
  private Long favoriteId;
  private String productId;
  private String productName;
  private BigDecimal productPrice;
  private String productImageUrl;


  public FavoriteDTO() {
  }

  public FavoriteDTO(Long favoriteId,
                     String productId,
                     String productName,
                     BigDecimal productPrice,
                     String productImageUrl) {
    this.favoriteId = favoriteId;
    this.productId = productId;
    this.productName = productName;
    this.productPrice = productPrice;
    this.productImageUrl = productImageUrl;
  }

  public String getProductId() {
    return productId;
  }

  public void setProductId(String productId) {
    this.productId = productId;
  }

  public Long getFavoriteId() {
    return favoriteId;
  }

  public void setFavoriteId(Long favoriteId) {
    this.favoriteId = favoriteId;
  }

  public String getProductName() {
    return productName;
  }

  public void setProductName(String productName) {
    this.productName = productName;
  }

  public BigDecimal getProductPrice() {
    return productPrice;
  }

  public void setProductPrice(BigDecimal productPrice) {
    this.productPrice = productPrice;
  }

  public String getProductImageUrl() {
    return productImageUrl;
  }

  public void setProductImageUrl(String productImageUrl) {
    this.productImageUrl = productImageUrl;
  }
}
