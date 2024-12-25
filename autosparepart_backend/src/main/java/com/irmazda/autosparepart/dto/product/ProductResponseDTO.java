package com.irmazda.autosparepart.dto.product;

import java.math.BigDecimal;
import java.util.UUID;

public class ProductResponseDTO {
  private UUID productId;
  private String name;
  private String description;
  private BigDecimal price;
  private int stockQuantity;
  private String image;

  public ProductResponseDTO() {
  }

  public ProductResponseDTO(UUID productId, String name, String description, BigDecimal price,
      int stockQuantity, String image) {
    this.productId = productId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stockQuantity = stockQuantity;
    this.image = image;
  }

  public UUID getProductId() {
    return productId;
  }

  public void setProductId(UUID productId) {
    this.productId = productId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  public int getStockQuantity() {
    return stockQuantity;
  }

  public void setStockQuantity(int stockQuantity) {
    this.stockQuantity = stockQuantity;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }
}
