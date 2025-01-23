package com.irmazda.autosparepart.service.impl;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.irmazda.autosparepart.service.UserService;
import org.springframework.stereotype.Service;

import com.irmazda.autosparepart.entity.Cart;
import com.irmazda.autosparepart.entity.CartItem;
import com.irmazda.autosparepart.entity.Product;
import com.irmazda.autosparepart.entity.User;
import com.irmazda.autosparepart.repository.CartItemRepository;
import com.irmazda.autosparepart.repository.CartRepository;
import com.irmazda.autosparepart.repository.ProductRepository;
import com.irmazda.autosparepart.service.CartService;

@Service
public class CartServiceImpl implements CartService {

  private final CartRepository cartRepository;
  private final CartItemRepository cartItemRepository;
  private final ProductRepository productRepository;
  private final UserService userService;

  public CartServiceImpl(CartRepository cartRepository,
                         CartItemRepository cartItemRepository,
                         ProductRepository productRepository,
                         UserService userService) {
    this.cartRepository = cartRepository;
    this.cartItemRepository = cartItemRepository;
    this.productRepository = productRepository;
    this.userService = userService;
  }

  @Override
  public Cart addToCart(UUID productId, int quantity, Principal principal) {
    User user = userService.getUserFromPrincipal(principal);
    Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));

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
    return cartRepository.findByUser(user).map(Cart::getItems).orElse(List.of());
  }

  @Override
  public void clearCart(User user) {
    cartRepository.findByUser(user).ifPresent(cartRepository::delete);
  }
}
