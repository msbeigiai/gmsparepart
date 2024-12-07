package com.irmazda.autosparepart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.irmazda.autosparepart.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
