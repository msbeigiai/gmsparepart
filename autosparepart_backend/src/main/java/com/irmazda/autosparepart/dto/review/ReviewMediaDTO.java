package com.irmazda.autosparepart.dto.review;

import java.util.UUID;

public class ReviewMediaDTO {
  private UUID id;
  private String mediaType;
  private String mediaUrl;
  private String thumbnailUrl;

  public ReviewMediaDTO() {
  }

  public ReviewMediaDTO(UUID id, String mediaType, String mediaUrl, String thumbnailUrl) {
    this.id = id;
    this.mediaType = mediaType;
    this.mediaUrl = mediaUrl;
    this.thumbnailUrl = thumbnailUrl;
  }

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public String getMediaType() {
    return mediaType;
  }

  public void setMediaType(String mediaType) {
    this.mediaType = mediaType;
  }

  public String getMediaUrl() {
    return mediaUrl;
  }

  public void setMediaUrl(String mediaUrl) {
    this.mediaUrl = mediaUrl;
  }

  public String getThumbnailUrl() {
    return thumbnailUrl;
  }

  public void setThumbnailUrl(String thumbnailUrl) {
    this.thumbnailUrl = thumbnailUrl;
  }
}
