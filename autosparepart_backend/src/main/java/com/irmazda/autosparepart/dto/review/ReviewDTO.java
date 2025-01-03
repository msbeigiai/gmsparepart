package com.irmazda.autosparepart.dto.review;

import java.time.LocalDateTime;
import java.util.List;

public class ReviewDTO {
  private Long id;
  private Long productId;
  private String userName;
  private Integer rating;
  private String reviewText;
  private boolean verifiedPurchase;
  private List<String> mediaUrls;
  private LocalDateTime createdAt;
  private int helpfulVotes;

  public ReviewDTO() {
  }

  public ReviewDTO(Long id, Long productId, String userName, Integer rating, String reviewText, boolean verifiedPurchase,
      List<String> mediaUrls, LocalDateTime createdAt, int helpfulVotes) {
    this.id = id;
    this.productId = productId;
    this.userName = userName;
    this.rating = rating;
    this.reviewText = reviewText;
    this.verifiedPurchase = verifiedPurchase;
    this.mediaUrls = mediaUrls;
    this.createdAt = createdAt;
    this.helpfulVotes = helpfulVotes;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getProductId() {
    return productId;
  }

  public void setProductId(Long productId) {
    this.productId = productId;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
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

  public int getHelpfulVotes() {
    return helpfulVotes;
  }

  public void setHelpfulVotes(int helpfulVotes) {
    this.helpfulVotes = helpfulVotes;
  }

  
}
