package com.irmazda.autosparepart.service.impl;

import com.irmazda.autosparepart.dto.cart.CartTransferRequest;
import com.irmazda.autosparepart.dto.order.ListOrderDTO;
import com.irmazda.autosparepart.dto.order.OrderDTO;
import com.irmazda.autosparepart.entity.*;
import com.irmazda.autosparepart.entity.enums.OrderStatus;
import com.irmazda.autosparepart.entity.enums.ReviewStatus;
import com.irmazda.autosparepart.maps.OrderListMapper;
import com.irmazda.autosparepart.maps.OrderMapper;
import com.irmazda.autosparepart.repository.AddressRepository;
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
import java.util.Objects;
import java.util.UUID;

@Service
public class OrderServiceImpl implements OrderService {

  private final OrderRepository orderRepository;
  private final ProductRepository productRepository;
  private final UserService userService;
  private final OrderItemRepository orderItemRepository;
  private final AddressRepository addressRepository;
  private final OrderMapper orderMapper;
  private final OrderListMapper orderListMapper;

  public OrderServiceImpl(OrderRepository orderRepository,
                          ProductRepository productRepository,
                          UserService userService,
                          OrderItemRepository orderItemRepository,
                          AddressRepository addressRepository,
                          OrderMapper orderMapper,
                          OrderListMapper orderListMapper) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
    this.userService = userService;
    this.orderItemRepository = orderItemRepository;
    this.addressRepository = addressRepository;
    this.orderMapper = orderMapper;
    this.orderListMapper = orderListMapper;
  }

  @Override
  public Order createOrder(CartTransferRequest request, Principal principal) {
    User user = userService.getUserFromPrincipal(principal);
    Order order = new Order();
    order.setUser(user);
    order.setOrderDate(LocalDateTime.now());
    order.setStatus(OrderStatus.PENDING);

    List<Address> userAddresses = addressRepository.findByUserId(user.getUserId());

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

    for (Address address : userAddresses) {
      address.setDeliveryAddress(address.getAddressId().equals(request.getAddressId()));
    }

    return orderRepository.save(order);
  }

  @Override
  public List<Order> getUserOrders(User user) {
    return orderRepository.findByUser(user.getUserId());
  }

  @Override
  public OrderDTO getOrderById(UUID orderId, Principal principal) {
    Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order with this ID not found!"));

    User user = order.getUser();

    Address deliveryAddress = addressRepository.findByUserId(user.getUserId()).stream().filter(Address::isDeliveryAddress).findFirst()
            .orElseThrow(() -> new RuntimeException("No delivery address found!"));

    return orderMapper.mapTo(order, deliveryAddress);
  }

  @Override
  public List<ListOrderDTO> getAllOrders(Principal principal) {
    User user = userService.getUserFromPrincipal(principal);
    List<Order> orders = orderRepository.findByUser(user.getUserId());
    return orders.stream().map(orderListMapper::mapTo).toList();
  }


}
