package com.irmazda.autosparepart.maps;

import com.irmazda.autosparepart.dto.order.OrderDTO;
import com.irmazda.autosparepart.entity.Address;
import com.irmazda.autosparepart.entity.Order;
import com.irmazda.autosparepart.entity.OrderItem;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OrderMapper {


  public OrderDTO mapTo(Order order, Address address) {
    OrderDTO orderDTO = new OrderDTO();

    List<OrderItem> orderItems = order.getOrderItems();

    orderDTO.setOrderStatus(order.getStatus());
    orderDTO.setDeliveryAddress(address.toString());
    orderDTO.setCreationDate(order.getOrderDate());

    for (OrderItem orderItem : orderItems) {
      OrderDTO.OrderItemDTO orderItemDTO = orderItemMapper(orderItem);
      orderDTO.getOrderItemDTOS().add(orderItemDTO);
    }

    return orderDTO;
  }

  private OrderDTO.OrderItemDTO orderItemMapper(OrderItem orderItem) {
    OrderDTO.OrderItemDTO orderItemDTO = new OrderDTO.OrderItemDTO();
    orderItemDTO.setProductId(orderItemDTO.getProductId());
    orderItemDTO.setQuantity(orderItem.getQuantity());
    orderItemDTO.setSubTotal(orderItem.getSubtotal());
    orderItemDTO.setProductName(orderItem.getProduct().getName());
    return orderItemDTO;
  }
}
