package com.irmazda.autosparepart.service;

import com.irmazda.autosparepart.dto.category.CategoryDTO;

import java.util.List;

public interface CategoryService {
  List<CategoryDTO> getAllCategories();
}
