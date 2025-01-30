package com.irmazda.autosparepart.controller;

import com.irmazda.autosparepart.dto.cart.CartTransferRequest;
import com.irmazda.autosparepart.dto.order.OrderDTO;
import com.irmazda.autosparepart.entity.Order;
import com.irmazda.autosparepart.service.OrderService;
import com.irmazda.autosparepart.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.security.Principal;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

  private final OrderService orderService;

  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @PostMapping("/transfer-cart")
  public ResponseEntity<Order> createOrder(@RequestBody CartTransferRequest request,
                                           Principal principal) {
    return ResponseEntity
            .created(URI.create("")).body(orderService.createOrder(request, principal));
  }

  @GetMapping("/{orderId}")
  public ResponseEntity<OrderDTO> getOrderById(@PathVariable UUID orderId,
                                               Principal principal) {
    return ResponseEntity.ok().body(orderService.getOrderById(orderId, principal));
  }

}

