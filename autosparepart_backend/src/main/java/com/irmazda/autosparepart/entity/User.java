package com.irmazda.autosparepart.entity;

import com.irmazda.autosparepart.entity.base.BaseEntityCreateUpdate;
import com.irmazda.autosparepart.entity.enums.UserRole;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User extends BaseEntityCreateUpdate {

  @Id
  @Column(name = "user_id")
  private String userId;

  @Column(name = "email", nullable = false, unique = true)
  private String email;

  @Enumerated(EnumType.STRING)
  private UserRole role;

  public User() {
  }

  public User(String email) {
    this.email = email;
  }

  public User(String email, UserRole role) {
    this.email = email;
    this.role = role;
  }

  public User(String userId, String email, UserRole role) {
    this.userId = userId;
    this.email = email;
    this.role = role;
  }

  public User(String userId, String email) {
    this.userId = userId;
    this.email = email;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public UserRole getRole() {
    return role;
  }

  public void setRole(UserRole role) {
    this.role = role;
  }
}
