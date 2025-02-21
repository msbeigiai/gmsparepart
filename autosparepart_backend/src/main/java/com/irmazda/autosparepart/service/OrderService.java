package com.irmazda.autosparepart.service;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

import com.irmazda.autosparepart.dto.cart.CartTransferRequest;
import com.irmazda.autosparepart.dto.order.ListOrderDTO;
import com.irmazda.autosparepart.dto.order.OrderDTO;
import com.irmazda.autosparepart.entity.Order;
import com.irmazda.autosparepart.entity.User;

import jakarta.transaction.Transactional;

public interface OrderService {

  @Transactional
  Order createOrder(CartTransferRequest request, Principal principal);

  List<Order> getUserOrders(User user);

  OrderDTO getOrderById(UUID orderId, Principal principal);

  List<ListOrderDTO> getAllOrders(Principal principal);
}
