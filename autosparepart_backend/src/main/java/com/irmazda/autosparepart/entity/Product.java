package com.irmazda.autosparepart.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.irmazda.autosparepart.entity.base.BaseEntityCreateUpdate;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product extends BaseEntityCreateUpdate {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "product_id", updatable = false, nullable = false)
  private UUID productId;

  @ManyToOne
  @JoinColumn(name = "category_id", nullable = false)
  private Category category;

  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<ProductImage> images = new ArrayList<>();

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "description")
  private String description;

  @Column(name = "price", nullable = false)
  private BigDecimal price;

  @Column(name = "stock_quantity", nullable = false)
  private int stockQuantity;

  public Product() {
  }

  public Product(UUID productId) {
    this.productId = productId;
  }

  public Product(String name, String description, BigDecimal price, int stockQuantity) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.stockQuantity = stockQuantity;
  }

  public void addImage(ProductImage image) {
    image.setProduct(this);  // Ensure bidirectional linkage
    this.images.add(image);
  }

  public UUID getProductId() {
    return productId;
  }

  public void setProductId(UUID productId) {
    this.productId = productId;
  }

  public Category getCategory() {
    return category;
  }

  public void setCategory(Category category) {
    this.category = category;
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

  public List<ProductImage> getImages() {
    return images;
  }

  public void setImages(List<ProductImage> images) {
    this.images = images;
  }

}
