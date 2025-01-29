package com.irmazda.autosparepart.dto.cart;

import java.util.List;
import java.util.UUID;

public class CartTransferRequest {

  private List<CartItemDTO> cartItems;
  private Long addressId;

  public List<CartItemDTO> getCartItems() {
    return cartItems;
  }

  public void setCartItems(List<CartItemDTO> cartItems) {
    this.cartItems = cartItems;
  }

  public Long getAddressId() {
    return addressId;
  }

  public void setAddressId(Long addressId) {
    this.addressId = addressId;
  }

  public static class CartItemDTO {
    private UUID productId;
    private int quantity;

    public UUID getProductId() {
      return productId;
    }

    public void setProductId(UUID productId) {
      this.productId = productId;
    }

    public int getQuantity() {
      return quantity;
    }

    public void setQuantity(int quantity) {
      this.quantity = quantity;
    }
  }
}
