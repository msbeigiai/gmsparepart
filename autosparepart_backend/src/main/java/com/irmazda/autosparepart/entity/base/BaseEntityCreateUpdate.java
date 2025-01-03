package com.irmazda.autosparepart.entity.base;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntityCreateUpdate {
  @CreatedDate
  @Column(updatable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  // @CreatedBy
  // @Column(updatable = false)
  // private String createdBy;

  @LastModifiedDate
  @Column(insertable = false)
  private LocalDateTime updatedAt;

  // @LastModifiedBy
  // @Column(insertable = false)
  // private String updatedBy;

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  // public String getCreatedBy() {
  // return createdBy;
  // }

  // public void setCreatedBy(String createdBy) {
  // this.createdBy = createdBy;
  // }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }

  @Override
  public String toString() {
    return "BaseEntity [createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
  }

  // public String getUpdatedBy() {
  // return updatedBy;
  // }

  // public void setUpdatedBy(String updatedBy) {
  // this.updatedBy = updatedBy;
  // }

}
