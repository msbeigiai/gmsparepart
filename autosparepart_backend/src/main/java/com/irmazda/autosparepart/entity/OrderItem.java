package com.irmazda.autosparepart.entity;

import com.irmazda.autosparepart.entity.base.BaseEntityCreateUpdate;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
public class OrderItem extends BaseEntityCreateUpdate {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "order_item_id", updatable = false, nullable = false)
  private Long orderItemId;

  @ManyToOne
  @JoinColumn(name = "order_id", nullable = false)
  private Order order;

  @ManyToOne
  @JoinColumn(name = "product_id", nullable = false)
  private Product product;

  @Column(name = "quantity", nullable = false)
  private int quantity;

  @Column(name = "price_per_unit", nullable = false)
  private BigDecimal pricePerUnit;

  @Column(name = "subtotal")
  private BigDecimal subtotal;

  public OrderItem() {
  }

  public OrderItem(Long orderItemId,
                   Order order,
                   Product product,
                   int quantity,
                   BigDecimal pricePerUnit,
                   BigDecimal subtotal) {
    this.orderItemId = orderItemId;
    this.order = order;
    this.product = product;
    this.quantity = quantity;
    this.pricePerUnit = pricePerUnit;
    this.subtotal = subtotal;
  }

  public Long getOrderItemId() {
    return orderItemId;
  }

  public void setOrderItemId(Long orderItemId) {
    this.orderItemId = orderItemId;
  }

  public Order getOrder() {
    return order;
  }

  public void setOrder(Order order) {
    this.order = order;
  }

  public Product getProduct() {
    return product;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

  public BigDecimal getPricePerUnit() {
    return pricePerUnit;
  }

  public void setPricePerUnit(BigDecimal pricePerUnit) {
    this.pricePerUnit = pricePerUnit;
  }

  public BigDecimal getSubtotal() {
    return subtotal;
  }

  public void setSubtotal(BigDecimal subtotal) {
    this.subtotal = subtotal;
  }

}
