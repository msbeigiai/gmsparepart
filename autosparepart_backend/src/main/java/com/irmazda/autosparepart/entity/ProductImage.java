package com.irmazda.autosparepart.entity;

import java.util.UUID;

import com.irmazda.autosparepart.entity.base.BaseEntityCreateUpdate;

import jakarta.persistence.*;

@Entity
@Table(name = "product_images")
public class ProductImage extends BaseEntityCreateUpdate {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "image_id", updatable = false, nullable = false)
  private UUID imageId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id", nullable = false)
  private Product product;

  @Column(name = "url", nullable = false)
  private String url;

  @Column(name = "alt_text")
  private String altText;

  @Column(name = "is_main_image", nullable = false)
  private boolean isMainImage;

  public ProductImage() {
  }

  public ProductImage(String url, String altText, boolean isMainImage) {
    this.url = url;
    this.altText = altText;
    this.isMainImage = isMainImage;
  }

  public UUID getImageId() {
    return imageId;
  }

  public void setImageId(UUID imageId) {
    this.imageId = imageId;
  }

  public Product getProduct() {
    return product;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public String getAltText() {
    return altText;
  }

  public void setAltText(String altText) {
    this.altText = altText;
  }

  public boolean isMainImage() {
    return isMainImage;
  }

  public void setMainImage(boolean isMainImage) {
    this.isMainImage = isMainImage;
  }
}
