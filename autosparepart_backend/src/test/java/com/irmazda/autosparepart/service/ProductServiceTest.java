package com.irmazda.autosparepart.service;

import com.irmazda.autosparepart.dto.product.ProductImageDTO;
import com.irmazda.autosparepart.dto.product.ProductRequestDTO;
import com.irmazda.autosparepart.dto.product.ProductResponseDTO;
import com.irmazda.autosparepart.entity.Category;
import com.irmazda.autosparepart.entity.Product;
import com.irmazda.autosparepart.repository.CategoryRepository;
import com.irmazda.autosparepart.repository.ProductRepository;
import com.irmazda.autosparepart.service.impl.ProductServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

public class ProductServiceTest {

  @Mock
  private ProductRepository productRepository;

  @Mock
  private CategoryRepository categoryRepository;

  @InjectMocks
  private ProductServiceImpl productService;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void shouldAddProductSuccessfully() {
    // Arrange
    ProductRequestDTO request = new ProductRequestDTO(
            "Test Product",
            "Product Description",
            BigDecimal.valueOf(100.0),
            5,
            "Engine Parts",
            List.of(
                    new ProductImageDTO("image1.com", "Main Image", true),
                    new ProductImageDTO("image2.com", "Side Image", false)
            )
    );
    Category category = new Category("Engine Parts");
    Product savedProduct = new Product("Test Product", "Product Description", BigDecimal.valueOf(100.0), 5);
    savedProduct.setCategory(category);

    when(categoryRepository.findByName("Engine Parts")).thenReturn(Optional.of(category));
    when(productRepository.save(any(Product.class))).thenReturn(savedProduct);

    // Act
    ProductResponseDTO response = productService.addProduct(request);

    // Assert
    assertNotNull(response);
    assertEquals("Test Product", response.getName());
    assertEquals(BigDecimal.valueOf(100.0), response.getPrice());
    verify(productRepository, times(1)).save(any(Product.class));
  }


}
