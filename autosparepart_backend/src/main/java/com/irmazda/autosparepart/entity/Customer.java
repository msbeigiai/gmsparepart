package com.irmazda.autosparepart.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.irmazda.autosparepart.entity.base.BaseEntityCreateUpdate;

@Entity
@Table(name = "customers")
public class Customer extends BaseEntityCreateUpdate {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "customer_id", updatable = false, nullable = false)
  private Long customerId;

  @OneToOne
  @JoinColumn(name = "user_id", nullable = false, unique = true)
  private User user;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "phone_number", nullable = false)
  private String phoneNumber;

  @Column(name = "total_spent")
  private BigDecimal totalSpent = BigDecimal.ZERO;

  public Customer(Long customerId, User user, String name, String phoneNumber, BigDecimal totalSpent,
      LocalDateTime createdAt) {
    this.customerId = customerId;
    this.user = user;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.totalSpent = totalSpent;
  }

  public Long getCustomerId() {
    return customerId;
  }

  public void setCustomerId(Long customerId) {
    this.customerId = customerId;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public BigDecimal getTotalSpent() {
    return totalSpent;
  }

  public void setTotalSpent(BigDecimal totalSpent) {
    this.totalSpent = totalSpent;
  }
}
