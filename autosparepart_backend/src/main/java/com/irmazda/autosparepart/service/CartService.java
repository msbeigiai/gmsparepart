package com.irmazda.autosparepart.service;

import com.irmazda.autosparepart.entity.Cart;
import com.irmazda.autosparepart.entity.CartItem;
import com.irmazda.autosparepart.entity.User;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.UUID;

public interface CartService {
  @Transactional
  Cart addToCart(User user, UUID productId, int quantity);
  List<CartItem> getCartItems(User user);
  void clearCart(User user);
}
