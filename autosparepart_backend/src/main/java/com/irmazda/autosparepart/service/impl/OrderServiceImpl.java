package com.irmazda.autosparepart.service.impl;

import com.irmazda.autosparepart.dto.cart.CartTransferRequest;
import com.irmazda.autosparepart.dto.order.OrderDTO;
import com.irmazda.autosparepart.entity.Order;
import com.irmazda.autosparepart.entity.OrderItem;
import com.irmazda.autosparepart.entity.Product;
import com.irmazda.autosparepart.entity.User;
import com.irmazda.autosparepart.entity.enums.OrderStatus;
import com.irmazda.autosparepart.entity.enums.ReviewStatus;
import com.irmazda.autosparepart.repository.OrderItemRepository;
import com.irmazda.autosparepart.repository.OrderRepository;
import com.irmazda.autosparepart.repository.ProductRepository;
import com.irmazda.autosparepart.service.OrderService;
import com.irmazda.autosparepart.service.UserService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class OrderServiceImpl implements OrderService {

  private final OrderRepository orderRepository;
  private final ProductRepository productRepository;
  private final UserService userService;
  private final OrderItemRepository orderItemRepository;

  public OrderServiceImpl(OrderRepository orderRepository,
                          ProductRepository productRepository,
                          UserService userService,
                          OrderItemRepository orderItemRepository) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
    this.userService = userService;
    this.orderItemRepository = orderItemRepository;
  }

  @Override
  public Order createOrder(CartTransferRequest request, Principal principal) {
    User user = userService.getUserFromPrincipal(principal);
    Order order = new Order();
    order.setUser(user);
    order.setOrderDate(LocalDateTime.now());
    order.setStatus(OrderStatus.PENDING);

    BigDecimal totalAmount = BigDecimal.ZERO;

    for (CartTransferRequest.CartItemDTO cartItem : request.getCartItems()) {
      Product product = productRepository.findById(cartItem.getProductId())
              .orElseThrow(() -> new RuntimeException("Product not found"));

      OrderItem orderItem = new OrderItem();
      orderItem.setProduct(product);
      orderItem.setQuantity(cartItem.getQuantity());
      orderItem.setOrder(order);
      orderItem.setPricePerUnit(product.getPrice());

      orderItem.setSubtotal(product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));

      totalAmount = totalAmount.add(orderItem.getSubtotal());

      order.getOrderItems().add(orderItem);
    }

    order.setTotalAmount(totalAmount);
    return orderRepository.save(order);
  }

  @Override
  public List<Order> getUserOrders(User user) {
    return orderRepository.findByUser(user);
  }

  @Override
  public OrderDTO getOrderById(UUID orderId, Principal principal) {
    Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order with this ID not found!"));

    List<OrderItem> orderItems = order.getOrderItems();


    return null;
  }


}
