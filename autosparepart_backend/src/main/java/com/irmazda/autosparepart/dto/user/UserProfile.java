package com.irmazda.autosparepart.dto.user;

import com.irmazda.autosparepart.entity.User;

import java.util.List;
import java.util.Map;

public class UserProfile {
  private User user;
  private String firstName;
  private String lastName;
  private Map<String, List<String>> attributes;

  public UserProfile(User user,
                     String firstName,
                     String lastName,
                     Map<String, List<String>> attributes) {
    this.user = user;
    this.firstName = firstName;
    this.lastName = lastName;
    this.attributes = attributes;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
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

  public Map<String, List<String>> getAttributes() {
    return attributes;
  }

  public void setAttributes(Map<String, List<String>> attributes) {
    this.attributes = attributes;
  }
}
