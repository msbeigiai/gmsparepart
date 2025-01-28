package com.irmazda.autosparepart.repository;

import com.irmazda.autosparepart.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
