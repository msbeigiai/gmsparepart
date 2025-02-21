package com.irmazda.autosparepart.dto.product;

import java.math.BigDecimal;
import java.util.UUID;

public class AddProductDTO {

  private UUID productId;
  private String name;
  private String description;
  private BigDecimal price;
  private int stockQuantity;
  private Long categoryId;
  private String categoryName;
  private String brand;
  private String manufacturer;
  private String compatibility;

  public AddProductDTO() {
  }

  public AddProductDTO(UUID productId,
                       String name,
                       String description,
                       BigDecimal price,
                       int stockQuantity,
                       Long categoryId,
                       String categoryName,
                       String brand,
                       String manufacturer,
                       String compatibility) {
    this.productId = productId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stockQuantity = stockQuantity;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.brand = brand;
    this.manufacturer = manufacturer;
    this.compatibility = compatibility;
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

  public Long getCategoryId() {
    return categoryId;
  }

  public void setCategoryId(Long categoryId) {
    this.categoryId = categoryId;
  }

  public UUID getProductId() {
    return productId;
  }

  public void setProductId(UUID productId) {
    this.productId = productId;
  }

  public String getCategoryName() {
    return categoryName;
  }

  public void setCategoryName(String categoryName) {
    this.categoryName = categoryName;
  }

  public String getBrand() {
    return brand;
  }

  public void setBrand(String brand) {
    this.brand = brand;
  }

  public String getManufacturer() {
    return manufacturer;
  }

  public void setManufacturer(String manufacturer) {
    this.manufacturer = manufacturer;
  }

  public String getCompatibility() {
    return compatibility;
  }

  public void setCompatibility(String compatibility) {
    this.compatibility = compatibility;
  }
}
