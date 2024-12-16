package com.irmazda.autosparepart.service.impl;

import com.irmazda.autosparepart.entity.Cart;
import com.irmazda.autosparepart.entity.CartItem;
import com.irmazda.autosparepart.entity.Product;
import com.irmazda.autosparepart.entity.User;
import com.irmazda.autosparepart.repository.CartItemRepository;
import com.irmazda.autosparepart.repository.CartRepository;
import com.irmazda.autosparepart.repository.ProductRepository;
import com.irmazda.autosparepart.service.CartService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class CartServiceImpl implements CartService {

  private final CartRepository cartRepository;
  private final CartItemRepository cartItemRepository;
  private final ProductRepository productRepository;

  public CartServiceImpl(CartRepository cartRepository, CartItemRepository cartItemRepository, ProductRepository productRepository) {
    this.cartRepository = cartRepository;
    this.cartItemRepository = cartItemRepository;
    this.productRepository = productRepository;
  }

  @Override
  public Cart addToCart(User user, UUID productId, int quantity) {
    Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

    Cart cart = cartRepository.findByUser(user).orElseGet(() -> {
      Cart newCart = new Cart();
      newCart.setUser(user);
      return cartRepository.save(newCart);
    });

    Optional<CartItem> existingItem = cart.getItems().stream()
            .filter(item -> item.getProduct().equals(product))
            .findFirst();

    if (existingItem.isPresent()) {
      CartItem cartItem = existingItem.get();
      cartItem.setQuantity(cartItem.getQuantity() + quantity);
      cartItemRepository.save(cartItem);
    } else {
      CartItem newItem = new CartItem();
      newItem.setCart(cart);
      newItem.setProduct(product);
      newItem.setQuantity(quantity);
      cartItemRepository.save(newItem);
      cart.getItems().add(newItem);
    }

    return cartRepository.save(cart);
  }

  @Override
  public List<CartItem> getCartItems(User user) {
    return List.of();
  }

  @Override
  public void clearCart(User user) {

  }
}
