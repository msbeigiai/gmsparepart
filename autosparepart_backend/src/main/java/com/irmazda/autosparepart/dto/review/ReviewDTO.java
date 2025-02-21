package com.irmazda.autosparepart.dto.review;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class ReviewDTO {
  private Long id;
  private UUID productId;
  private String username;
  private String title;
  private Integer rating;
  private String reviewText;
  private boolean verifiedPurchase;
  private List<String> mediaUrls;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private int helpfulVotes;

  public ReviewDTO() {
  }

  public ReviewDTO(
          Long id,
          UUID productId,
          String username, String title,
          Integer rating,
          String reviewText,
          boolean verifiedPurchase,
          List<String> mediaUrls,
          LocalDateTime createdAt,
          LocalDateTime updatedAt,
          int helpfulVotes) {
    this.id = id;
    this.productId = productId;
    this.username = username;
    this.title = title;
    this.rating = rating;
    this.reviewText = reviewText;
    this.verifiedPurchase = verifiedPurchase;
    this.mediaUrls = mediaUrls;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.helpfulVotes = helpfulVotes;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public UUID getProductId() {
    return productId;
  }

  public void setProductId(UUID productId) {
    this.productId = productId;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public Integer getRating() {
    return rating;
  }

  public void setRating(Integer rating) {
    this.rating = rating;
  }

  public String getReviewText() {
    return reviewText;
  }

  public void setReviewText(String reviewText) {
    this.reviewText = reviewText;
  }

  public boolean isVerifiedPurchase() {
    return verifiedPurchase;
  }

  public void setVerifiedPurchase(boolean verifiedPurchase) {
    this.verifiedPurchase = verifiedPurchase;
  }

  public List<String> getMediaUrls() {
    return mediaUrls;
  }

  public void setMediaUrls(List<String> mediaUrls) {
    this.mediaUrls = mediaUrls;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }

  public int getHelpfulVotes() {
    return helpfulVotes;
  }

  public void setHelpfulVotes(int helpfulVotes) {
    this.helpfulVotes = helpfulVotes;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }
}