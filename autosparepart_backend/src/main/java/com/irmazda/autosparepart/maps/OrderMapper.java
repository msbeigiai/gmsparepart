package com.irmazda.autosparepart.maps;

import com.irmazda.autosparepart.dto.order.OrderDTO;
import com.irmazda.autosparepart.entity.Order;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

  public OrderDTO mapTo(Order order) {
    OrderDTO orderDTO = new OrderDTO();

    return orderDTO;
  }
}
