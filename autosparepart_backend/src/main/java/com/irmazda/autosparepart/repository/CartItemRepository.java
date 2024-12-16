package com.irmazda.autosparepart.repository;

import com.irmazda.autosparepart.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
