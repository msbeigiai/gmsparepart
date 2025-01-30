package com.irmazda.autosparepart.dto.order;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class OrderDTO {

  private List<OrderItemDTO> orderItemDTOS;
  private String deliveryAddress;
  private LocalDateTime creationDate;
  private String orderStatus;
  private BigDecimal totalOrderAmount;

  public List<OrderItemDTO> getOrderItemDTOS() {
    return orderItemDTOS;
  }

  public void setOrderItemDTOS(List<OrderItemDTO> orderItemDTOS) {
    this.orderItemDTOS = orderItemDTOS;
  }

  public String getDeliveryAddress() {
    return deliveryAddress;
  }

  public void setDeliveryAddress(String deliveryAddress) {
    this.deliveryAddress = deliveryAddress;
  }

  public LocalDateTime getCreationDate() {
    return creationDate;
  }

  public void setCreationDate(LocalDateTime creationDate) {
    this.creationDate = creationDate;
  }

  public String getOrderStatus() {
    return orderStatus;
  }

  public void setOrderStatus(String orderStatus) {
    this.orderStatus = orderStatus;
  }

  public BigDecimal getTotalOrderAmount() {
    return totalOrderAmount;
  }

  public void setTotalOrderAmount(BigDecimal totalOrderAmount) {
    this.totalOrderAmount = totalOrderAmount;
  }

  public static class OrderItemDTO {
    private UUID productId;
    private String productName;
    private int quantity;
    private BigDecimal subTotal;

    public UUID getProductId() {
      return productId;
    }

    public void setProductId(UUID productId) {
      this.productId = productId;
    }

    public String getProductName() {
      return productName;
    }

    public void setProductName(String productName) {
      this.productName = productName;
    }

    public int getQuantity() {
      return quantity;
    }

    public void setQuantity(int quantity) {
      this.quantity = quantity;
    }

    public BigDecimal getSubTotal() {
      return subTotal;
    }

    public void setSubTotal(BigDecimal subTotal) {
      this.subTotal = subTotal;
    }
  }
}
