package com.irmazda.autosparepart.entity;

import com.irmazda.autosparepart.entity.base.BaseEntityCreate;
import com.irmazda.autosparepart.entity.enums.MediaType;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "review_media") 
public class ReviewMedia extends BaseEntityCreate {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "review_id", nullable = false)
  private Review review;

  @Enumerated(EnumType.STRING)
  @Column(name = "type")
  private MediaType mediaType;

  private String mediaUrl;
  private String thumbnailUrl;
  private Long fileSize;
  private String contentType;
  
  public ReviewMedia() {
  }

  public ReviewMedia(Review review, MediaType mediaType, String mediaUrl, String thumbnailUrl, Long fileSize,
      String contentType) {
    this.review = review;
    this.mediaType = mediaType;
    this.mediaUrl = mediaUrl;
    this.thumbnailUrl = thumbnailUrl;
    this.fileSize = fileSize;
    this.contentType = contentType;
  }

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public Review getReview() {
    return review;
  }

  public void setReview(Review review) {
    this.review = review;
  }

  public MediaType getMediaType() {
    return mediaType;
  }

  public void setMediaType(MediaType mediaType) {
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

  public Long getFileSize() {
    return fileSize;
  }

  public void setFileSize(Long fileSize) {
    this.fileSize = fileSize;
  }

  public String getContentType() {
    return contentType;
  }

  public void setContentType(String contentType) {
    this.contentType = contentType;
  }
}
