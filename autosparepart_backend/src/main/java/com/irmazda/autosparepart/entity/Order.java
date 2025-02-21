package com.irmazda.autosparepart.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.irmazda.autosparepart.entity.base.BaseEntityCreateUpdate;

import com.irmazda.autosparepart.entity.enums.OrderStatus;
import com.irmazda.autosparepart.entity.enums.ReviewStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order extends BaseEntityCreateUpdate {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "order_id", updatable = false, nullable = false)
  private UUID orderId;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<OrderItem> orderItems = new ArrayList<>();

  @Column(name = "order_date", nullable = false, updatable = false)
  private LocalDateTime orderDate;

  @Column(name = "total_amount", nullable = false)
  private BigDecimal totalAmount;

  @Enumerated(EnumType.STRING)
  @Column(name = "status")
  private OrderStatus status;

  public Order() {
  }

  public Order(User user, LocalDateTime orderDate, BigDecimal totalAmount, OrderStatus status) {
    this.user = user;
    this.orderDate = orderDate;
    this.totalAmount = totalAmount;
    this.status = status;
  }

  public UUID getOrderId() {
    return orderId;
  }

  public void setOrderId(UUID orderId) {
    this.orderId = orderId;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public void setOrderItems(List<OrderItem> items) {
    orderItems.forEach(item -> item.setOrder(this));
    this.orderItems.addAll(items);
  }

  public LocalDateTime getOrderDate() {
    return orderDate;
  }

  public void setOrderDate(LocalDateTime orderDate) {
    this.orderDate = orderDate;
  }

  public BigDecimal getTotalAmount() {
    return totalAmount;
  }

  public void setTotalAmount(BigDecimal totalAmount) {
    this.totalAmount = totalAmount;
  }

  public String getStatus() {
    return status.toString();
  }

  public void setStatus(OrderStatus status) {
    this.status = status;
  }

  public boolean hasProductId(UUID productId) {
    return !orderItems.stream().filter(
            orderItem -> orderItem.getProduct().getProductId().equals(productId)).toList().isEmpty();
  }

  public List<OrderItem> getOrderItems() {
    return orderItems;
  }
}
