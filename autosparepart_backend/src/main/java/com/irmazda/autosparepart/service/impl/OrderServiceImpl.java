package com.irmazda.autosparepart.service.impl;

import com.irmazda.autosparepart.entity.Order;
import com.irmazda.autosparepart.entity.OrderItem;
import com.irmazda.autosparepart.entity.Product;
import com.irmazda.autosparepart.entity.User;
import com.irmazda.autosparepart.entity.enums.OrderStatus;
import com.irmazda.autosparepart.entity.enums.ReviewStatus;
import com.irmazda.autosparepart.repository.OrderRepository;
import com.irmazda.autosparepart.repository.ProductRepository;
import com.irmazda.autosparepart.service.OrderService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

  private final OrderRepository orderRepository;
  private final ProductRepository productRepository;

  public OrderServiceImpl(OrderRepository orderRepository, ProductRepository productRepository) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
  }

  @Override
  public Order createOrder(User user, List<OrderItem> items) {
    Order order = new Order();
    order.setUser(user);
    order.setOrderDate(LocalDateTime.now());
    order.setStatus(OrderStatus.PENDING);

    for (OrderItem item : items) {
      Product product = productRepository.findById(item.getProduct().getProductId())
              .orElseThrow(() -> new RuntimeException("Product not found"));

      item.setOrder(order);
      item.setSubtotal(product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
    }

    order.setOrderItems(items);
    return orderRepository.save(order);
  }

  @Override
  public List<Order> getUserOrders(User user) {
    return orderRepository.findByUser(user);
  }
}
