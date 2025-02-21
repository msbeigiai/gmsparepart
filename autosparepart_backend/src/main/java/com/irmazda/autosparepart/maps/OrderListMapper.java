package com.irmazda.autosparepart.maps;

import com.irmazda.autosparepart.dto.order.ListOrderDTO;
import com.irmazda.autosparepart.entity.Order;
import com.irmazda.autosparepart.entity.enums.OrderStatus;
import org.springframework.stereotype.Component;

@Component
public class OrderListMapper {
  public ListOrderDTO mapTo(Order order) {
    ListOrderDTO orderDTO = new ListOrderDTO();
    orderDTO.setOrderId(order.getOrderId());
    orderDTO.setTotalOrderAmount(order.getTotalAmount());
    orderDTO.setCreationDate(order.getOrderDate());
    orderDTO.setOrderStatus(OrderStatus.valueOf(order.getStatus()));
    return orderDTO;
  }
}
