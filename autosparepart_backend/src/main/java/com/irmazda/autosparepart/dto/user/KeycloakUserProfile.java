package com.irmazda.autosparepart.dto.user;

import java.util.List;
import java.util.Map;

public class KeycloakUserProfile {
  private String userName;
  private String lastName;
  private Map<String, List<String>> attributes;

  public KeycloakUserProfile(String userName,
                             String lastName,
                             Map<String, List<String>> attributes) {
    this.userName = userName;
    this.lastName = lastName;
    this.attributes = attributes;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
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
