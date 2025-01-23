package com.irmazda.autosparepart.service;

import com.irmazda.autosparepart.dto.cart.CartTransferRequest;
import com.irmazda.autosparepart.entity.Order;
import com.irmazda.autosparepart.entity.OrderItem;
import com.irmazda.autosparepart.entity.User;
import jakarta.transaction.Transactional;

import java.security.Principal;
import java.util.List;

public interface OrderService {

  @Transactional
  Order createOrder(CartTransferRequest request, Principal principal);

  List<Order> getUserOrders(User user);
}
