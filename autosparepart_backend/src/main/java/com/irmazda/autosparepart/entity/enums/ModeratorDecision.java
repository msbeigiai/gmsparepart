package com.irmazda.autosparepart.entity.enums;

public enum ModeratorDecision {
  APPROVE("Review meets content guidelines"),
  REJECT("Review violates content guidelines"),
  FLAG_FOR_REVIEW("Review needs additional review"),
  REMOVE_MEDIA("Media content violates guidelines but text is acceptable"),
  REQUEST_EDIT("Review needs modification from user");

  private final String description;

  ModeratorDecision(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }
}
