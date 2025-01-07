package com.irmazda.autosparepart.dto.review;

public class ReviewMediaDTO {
  private Long id;
  private String mediaType;
  private String mediaUrl;
  private String thumbnailUrl;

  public ReviewMediaDTO() {
  }

  public ReviewMediaDTO(Long id, String mediaType, String mediaUrl, String thumbnailUrl) {
    this.id = id;
    this.mediaType = mediaType;
    this.mediaUrl = mediaUrl;
    this.thumbnailUrl = thumbnailUrl;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
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
