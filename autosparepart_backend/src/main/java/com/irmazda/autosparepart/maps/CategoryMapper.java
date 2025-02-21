package com.irmazda.autosparepart.maps;

import com.irmazda.autosparepart.dto.category.CategoryDTO;
import com.irmazda.autosparepart.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {
  public CategoryDTO mapTo(Category category) {
    return new CategoryDTO(
            category.getCategoryId(),
            category.getName(),
            (long) category.getProducts().size()
    );
  }
}
