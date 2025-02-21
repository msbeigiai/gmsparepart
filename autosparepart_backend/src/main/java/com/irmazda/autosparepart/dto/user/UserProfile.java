package com.irmazda.autosparepart.dto.user;

import com.irmazda.autosparepart.entity.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class UserProfile {
  private String userId;
  private String email;
  private String firstName;
  private String lastName;
  private LocalDateTime createdDate;
  private Map<String, List<String>> attributes;

  public UserProfile(
          String userId,
          String email,
          String firstName,
          String lastName, LocalDateTime createdDate,
          Map<String, List<String>> attributes) {
    this.userId = userId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdDate = createdDate;
    this.attributes = attributes;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Map<String, List<String>> getAttributes() {
    return attributes;
  }

  public void setAttributes(Map<String, List<String>> attributes) {
    this.attributes = attributes;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public LocalDateTime getCreatedDate() {
    return createdDate;
  }

  public void setCreatedDate(LocalDateTime createdDate) {
    this.createdDate = createdDate;
  }
}


