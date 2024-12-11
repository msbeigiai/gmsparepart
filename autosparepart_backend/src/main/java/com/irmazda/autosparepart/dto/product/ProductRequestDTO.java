package com.irmazda.autosparepart.dto.product;

import java.math.BigDecimal;
import java.util.List;

public class ProductRequestDTO {
  private String name;
  private String description;
  private BigDecimal price;
  private int stock;
  private String categoryName;
  private List<ProductImageDTO> images;

  public ProductRequestDTO(String name, String description, BigDecimal price, int stockQuantity, String categoryName,
      List<ProductImageDTO> images) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stockQuantity;
    this.categoryName = categoryName;
    this.images = images;
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

  public int getStock() {
    return stock;
  }

  public void setStock(int stock) {
    this.stock = stock;
  }

  public List<ProductImageDTO> getImages() {
    return images;
  }

  public void setImages(List<ProductImageDTO> images) {
    this.images = images;
  }

  public String getCategoryName() {
    return categoryName;
  }

  public void setCategoryName(String categoryName) {
    this.categoryName = categoryName;
  }

}
