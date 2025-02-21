package com.irmazda.autosparepart.repository;

import com.irmazda.autosparepart.entity.Cart;
import com.irmazda.autosparepart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
  Optional<Cart> findByUser(User user);
}
