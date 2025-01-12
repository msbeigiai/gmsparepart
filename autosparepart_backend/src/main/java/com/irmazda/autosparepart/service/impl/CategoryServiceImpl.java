package com.irmazda.autosparepart.service.impl;

import com.irmazda.autosparepart.dto.category.CategoryDTO;
import com.irmazda.autosparepart.entity.Category;
import com.irmazda.autosparepart.maps.CategoryMapper;
import com.irmazda.autosparepart.repository.CategoryRepository;
import com.irmazda.autosparepart.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

  private final CategoryRepository categoryRepository;
  private final CategoryMapper categoryMapper;

  public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
    this.categoryRepository = categoryRepository;
    this.categoryMapper = categoryMapper;
  }

  @Override
  public List<CategoryDTO> getAllCategories() {
    List<Category> allCategories = categoryRepository.findAll();
    return allCategories.stream().map(categoryMapper::mapTo).toList();
  }
}
