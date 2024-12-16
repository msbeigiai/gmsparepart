package com.irmazda.autosparepart.repository;

import com.irmazda.autosparepart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
}
