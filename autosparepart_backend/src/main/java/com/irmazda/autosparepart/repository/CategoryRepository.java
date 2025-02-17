package com.irmazda.autosparepart.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.irmazda.autosparepart.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
  Optional<Category> findByName(String name);
}
