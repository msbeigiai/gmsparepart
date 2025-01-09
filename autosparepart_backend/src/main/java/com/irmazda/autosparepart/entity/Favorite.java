package com.irmazda.autosparepart.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
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
@Table(name = "favorites", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "product_id"})
})
public class Favorite {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long favoriteId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id", nullable = false)
  private Product product;

  @Column(name = "added_date", nullable = false, updatable = false)
  private LocalDateTime addedDate = LocalDateTime.now();

  public Favorite() {
  }

  public Favorite(User user, Product product, LocalDateTime addedDate) {
    this.user = user;
    this.product = product;
    this.addedDate = addedDate;
  }

  public Long getFavoriteId() {
    return favoriteId;
  }

  public void setFavoriteId(Long favoriteId) {
    this.favoriteId = favoriteId;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Product getProduct() {
    return product;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  public LocalDateTime getAddedDate() {
    return addedDate;
  }

  public void setAddedDate(LocalDateTime addedDate) {
    this.addedDate = addedDate;
  }
}