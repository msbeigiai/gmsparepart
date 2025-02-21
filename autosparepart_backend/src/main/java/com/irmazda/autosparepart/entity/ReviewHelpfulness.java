package com.irmazda.autosparepart.entity;

import com.irmazda.autosparepart.entity.base.BaseEntityCreateUpdate;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "review_helpfulness", uniqueConstraints = @UniqueConstraint(columnNames = { "review_id", "user_id" }))
public class ReviewHelpfulness extends BaseEntityCreateUpdate {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "review_id", nullable = false)
  private Review review;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  private boolean helpful;

  public ReviewHelpfulness() {
  }

  public ReviewHelpfulness(Review review, User user, boolean helpful) {
    this.review = review;
    this.user = user;
    this.helpful = helpful;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Review getReview() {
    return review;
  }

  public void setReview(Review review) {
    this.review = review;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public boolean isHelpful() {
    return helpful;
  }

  public void setHelpful(boolean helpful) {
    this.helpful = helpful;
  }

}
