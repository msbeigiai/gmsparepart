package com.irmazda.autosparepart.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "user_id", updatable = false, nullable = false)
  private UUID userId;

  @Column(name = "email", nullable = false, unique = true)
  private String email;

  @Column(name = "role", nullable = true)
  private String role;

  public User() {
  }

  public User(UUID userId, String email, String role, LocalDateTime createdAt, LocalDateTime updatedAt) {
    this.userId = userId;
    this.email = email;
    this.role = role;
  }

  public UUID getUserId() {
    return userId;
  }

  public void setUserId(UUID userId) {
    this.userId = userId;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }
}
