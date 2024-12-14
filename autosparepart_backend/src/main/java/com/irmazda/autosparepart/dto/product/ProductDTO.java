package com.irmazda.autosparepart.dto.product;

import java.math.BigDecimal;

public class ProductDTO {

  private String name;
  private String description;
  private BigDecimal price;
  private int stockQuantity;

  public ProductDTO(String name, String description, BigDecimal price, int stockQuantity) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.stockQuantity = stockQuantity;
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
}
