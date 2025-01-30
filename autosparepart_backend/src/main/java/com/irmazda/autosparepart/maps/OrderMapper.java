package com.irmazda.autosparepart.maps;

import com.irmazda.autosparepart.dto.order.OrderDTO;
import com.irmazda.autosparepart.entity.Address;
import com.irmazda.autosparepart.entity.Order;
import com.irmazda.autosparepart.entity.OrderItem;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class OrderMapper {


  public OrderDTO mapTo(Order order, Address address) {
    OrderDTO orderDTO = new OrderDTO();

    List<OrderItem> orderItems = order.getOrderItems();

    orderDTO.setOrderStatus(order.getStatus());
    orderDTO.setDeliveryAddress(address.getCountry() + ", " +
            address.getCity() + ", " +
            address.getPostalCode() + ", " +
            address.getAddressLine1());
    orderDTO.setCreationDate(order.getOrderDate());

    BigDecimal totalOrderAmount = BigDecimal.ZERO;

    List<OrderDTO.OrderItemDTO> orderItemDTOS = new ArrayList<>();

    for (OrderItem orderItem : orderItems) {
      OrderDTO.OrderItemDTO orderItemDTO = orderItemMapper(orderItem);
      orderItemDTOS.add(orderItemDTO);
      totalOrderAmount = totalOrderAmount.add(orderItem.getSubtotal());
    }
    orderDTO.setOrderItemDTOS(orderItemDTOS);
    orderDTO.setTotalOrderAmount(totalOrderAmount);
    return orderDTO;
  }

  private OrderDTO.OrderItemDTO orderItemMapper(OrderItem orderItem) {
    OrderDTO.OrderItemDTO orderItemDTO = new OrderDTO.OrderItemDTO();
    orderItemDTO.setProductId(orderItem.getProduct().getProductId());
    orderItemDTO.setQuantity(orderItem.getQuantity());
    orderItemDTO.setSubTotal(orderItem.getSubtotal());
    orderItemDTO.setProductName(orderItem.getProduct().getName());
    return orderItemDTO;
  }
}
