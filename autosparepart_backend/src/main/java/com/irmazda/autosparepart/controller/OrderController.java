package com.irmazda.autosparepart.controller;

import com.irmazda.autosparepart.dto.cart.CartTransferRequest;
import com.irmazda.autosparepart.dto.order.ListOrderDTO;
import com.irmazda.autosparepart.dto.order.OrderDTO;
import com.irmazda.autosparepart.entity.Order;
import com.irmazda.autosparepart.service.OrderService;
import com.irmazda.autosparepart.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

  private final OrderService orderService;

  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @PostMapping("/transfer-cart")
  public ResponseEntity<UUID> createOrder(@RequestBody CartTransferRequest request,
                                           Principal principal) {
    Order order = orderService.createOrder(request, principal);
    return ResponseEntity
            .created(URI.create("")).body(order.getOrderId());
  }

  @GetMapping("/{orderId}")
  public ResponseEntity<OrderDTO> getOrderById(@PathVariable UUID orderId,
                                               Principal principal) {
    return ResponseEntity.ok().body(orderService.getOrderById(orderId, principal));
  }

  @GetMapping
  public ResponseEntity<List<ListOrderDTO>> getOrders(Principal principal) {
    return ResponseEntity.ok(orderService.getAllOrders(principal));
  }

}

