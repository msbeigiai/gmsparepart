package com.irmazda.autosparepart.controller;

import com.irmazda.autosparepart.dto.cart.CartTransferRequest;
import com.irmazda.autosparepart.entity.Order;
import com.irmazda.autosparepart.entity.OrderItem;
import com.irmazda.autosparepart.entity.User;
import com.irmazda.autosparepart.service.OrderService;
import com.irmazda.autosparepart.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

  private final OrderService orderService;
  private final UserService userService;

  public OrderController(OrderService orderService, UserService userService) {
    this.orderService = orderService;
    this.userService = userService;
  }

  @PostMapping("/transfer-cart")
  public ResponseEntity<Order> createOrder(@RequestBody CartTransferRequest request,
                                           Principal principal) {
    return ResponseEntity
            .created(URI.create("")).body(orderService.createOrder(request, principal));
  }

  @GetMapping("/user")
  public List<Order> getUserOrders(Principal principal) {
    User user = userService.getUserFromPrincipal(principal);
    return orderService.getUserOrders(user);
  }


}

