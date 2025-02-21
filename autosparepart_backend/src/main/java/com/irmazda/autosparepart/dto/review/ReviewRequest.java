package com.irmazda.autosparepart.dto.review;

public class ReviewRequest {
  private Integer rating;
  private String title;
  private String reviewText;

  public ReviewRequest() {
  }

  public ReviewRequest(Integer rating, String title, String reviewText) {
    this.rating = rating;
    this.title = title;
    this.reviewText = reviewText;
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

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }
}
