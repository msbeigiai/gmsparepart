package com.irmazda.autosparepart.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "payments")
public class Payment {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "payment_id", updatable = false, nullable = false)
  private UUID paymentId;

  @OneToOne
  @JoinColumn(name = "order_id", nullable = false, unique = true)
  private Order order;

  @Column(name = "payment_date", nullable = false, updatable = false)
  private LocalDateTime paymentDate;

  @Column(name = "amount", nullable = false)
  private BigDecimal amount;

  @Column(name = "payment_method", nullable = false)
  private String paymentMethod;

  @Column(name = "status", nullable = false)
  private String status;

  public Payment(UUID paymentId, Order order, LocalDateTime paymentDate, BigDecimal amount, String paymentMethod,
      String status) {
    this.paymentId = paymentId;
    this.order = order;
    this.paymentDate = paymentDate;
    this.amount = amount;
    this.paymentMethod = paymentMethod;
    this.status = status;
  }

  public UUID getPaymentId() {
    return paymentId;
  }

  public void setPaymentId(UUID paymentId) {
    this.paymentId = paymentId;
  }

  public Order getOrder() {
    return order;
  }

  public void setOrder(Order order) {
    this.order = order;
  }

  public LocalDateTime getPaymentDate() {
    return paymentDate;
  }

  public void setPaymentDate(LocalDateTime paymentDate) {
    this.paymentDate = paymentDate;
  }

  public BigDecimal getAmount() {
    return amount;
  }

  public void setAmount(BigDecimal amount) {
    this.amount = amount;
  }

  public String getPaymentMethod() {
    return paymentMethod;
  }

  public void setPaymentMethod(String paymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

}
