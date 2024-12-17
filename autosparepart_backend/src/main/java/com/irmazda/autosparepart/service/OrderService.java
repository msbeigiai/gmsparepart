package com.irmazda.autosparepart.service;

import com.irmazda.autosparepart.entity.Order;
import com.irmazda.autosparepart.entity.OrderItem;
import com.irmazda.autosparepart.entity.User;
import jakarta.transaction.Transactional;

import java.util.List;

public interface OrderService {

  @Transactional
  Order createOrder(User user, List<OrderItem> items);

  List<Order> getUserOrders(User user);
}
