package com.irmazda.autosparepart.repository;

import com.irmazda.autosparepart.entity.Order;
import com.irmazda.autosparepart.entity.User;
import com.irmazda.autosparepart.entity.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
  List<Order> findByUser(User user);

  @Query("SELECT CASE WHEN COUNT(*) > 0 THEN true ELSE false END " +
          "FROM Order o " +
          "WHERE o.user.userId = :userId " +
          "AND o.orderDate > :orderDate " +
          "AND o.status = :status")
  boolean existsByUserIdAndProductIdAndOrderDateAfterAndStatus(UUID userId, UUID productId, LocalDateTime sixMonthsAgo, OrderStatus orderStatus);
}
