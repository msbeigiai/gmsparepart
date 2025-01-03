package com.irmazda.autosparepart.entity;

import java.util.List;

import com.irmazda.autosparepart.entity.base.BaseEntityCreateUpdate;
import com.irmazda.autosparepart.entity.enums.ReviewStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "reviews")
public class Review extends BaseEntityCreateUpdate {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id", nullable = false)
  private Product product;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  private Integer rating;

  @Column(columnDefinition = "TEXT")
  private String reviewText;

  private boolean verifiedPurchase;

  @Enumerated(EnumType.STRING)
  private ReviewStatus status;

  @OneToMany(mappedBy = "review", cascade = CascadeType.ALL)
  private List<ReviewMedia> reviewMedias;

  @OneToMany(mappedBy = "review", cascade = CascadeType.ALL)
  private List<ReviewHelpfulness> helpfulnessVotes;

  public Review() {
  }

  public Review(Product product, User user, Integer rating, String reviewText, boolean verifiedPurchase,
      ReviewStatus status) {
    this.product = product;
    this.user = user;
    this.rating = rating;
    this.reviewText = reviewText;
    this.verifiedPurchase = verifiedPurchase;
    this.status = status;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Product getProduct() {
    return product;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
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

  public ReviewStatus getStatus() {
    return status;
  }

  public void setStatus(ReviewStatus status) {
    this.status = status;
  }

  public List<ReviewMedia> getReviewMedias() {
    return reviewMedias;
  }

  public void setReviewMedias(List<ReviewMedia> reviewMedias) {
    this.reviewMedias = reviewMedias;
  }

  public List<ReviewHelpfulness> getHelpfulnessVotes() {
    return helpfulnessVotes;
  }

  public void setHelpfulnessVotes(List<ReviewHelpfulness> helpfulnessVotes) {
    this.helpfulnessVotes = helpfulnessVotes;
  }
 
  



}
