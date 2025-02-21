package com.irmazda.autosparepart.dto.product;

import com.irmazda.autosparepart.entity.Product;

public class ProductImageDTO {
  private String url;
  private String altText;
  private boolean mainImage;
  private Product product;

  public ProductImageDTO(String url, String altText, boolean mainImage) {
    this.url = url;
    this.altText = altText;
    this.mainImage = mainImage;
  }

  public ProductImageDTO() {
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
    return mainImage;
  }

  public void setMainImage(boolean mainImage) {
    this.mainImage = mainImage;
  }

  public Product getProduct() {
    return product;
  }

  public void setProduct(Product product) {
    this.product = product;
  }
}
