package com.irmazda.autosparepart.repository;

import com.irmazda.autosparepart.entity.Order;
import com.irmazda.autosparepart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
  List<Order> findByUser(User user);
}
