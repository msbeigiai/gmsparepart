package com.irmazda.autosparepart.controller;

import java.net.URI;
import java.security.Principal;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.irmazda.autosparepart.entity.Cart;
import com.irmazda.autosparepart.entity.User;
import com.irmazda.autosparepart.service.CartService;
import com.irmazda.autosparepart.service.UserService;

@RestController
@RequestMapping("/api/cart")
public class CartController {

  private final CartService cartService;
  private final UserService userService;

  public CartController(CartService cartService, UserService userService) {
    this.cartService = cartService;
    this.userService = userService;
  }

  @PostMapping("/add")
  public ResponseEntity<Cart> addToCart(@RequestParam UUID productId, @RequestParam int quantity, Principal principal) {
    User user = userService.getUserFromPrincipal(principal); // Assume this method fetches the authenticated user
    return ResponseEntity.created(URI.create("")).body(cartService.addToCart(user, productId, quantity));
  }

  @GetMapping("/items")
  public ResponseEntity<?> getCartItems(Principal principal) {
    User user = userService.getUserFromPrincipal(principal);
    return ResponseEntity
            .ok()
            .body(cartService.getCartItems(user));
  }

  @DeleteMapping("/clear")
  public void clearCart(Principal principal) {
    User user = userService.getUserFromPrincipal(principal);
    cartService.clearCart(user);
  }


}
