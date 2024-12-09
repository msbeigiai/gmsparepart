package com.irmazda.autosparepart.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;

import com.irmazda.autosparepart.entity.Category;
import com.irmazda.autosparepart.entity.Product;
import com.irmazda.autosparepart.entity.ProductImage;

import io.restassured.RestAssured;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ProductRepositoryTest {

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private CategoryRepository categoryRepository;

  @Autowired
  private ProductImageRepository productImageRepository;

  @LocalServerPort
  private Integer port;

  private static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

  @BeforeAll
  static void beforeAll() {
    postgres.start();
  }

  @AfterAll
  static void afterAll() {
    postgres.stop();
  }

  @DynamicPropertySource
  static void configureProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", postgres::getJdbcUrl);
    registry.add("spring.datasource.username", postgres::getUsername);
    registry.add("spring.datasource.password", postgres::getPassword);
  }

  @BeforeEach
  void setUp() {
    RestAssured.baseURI = "http://localhost:" + port;
    productRepository.deleteAll();
  }

  @Test
  public void shouldAddNewProduct() {
    // Create and save category
    Category category = new Category();
    category.setName("Engine Parts");
    categoryRepository.save(category);

    // Create product and set its properties
    Product product = new Product("Test Product", "Description", BigDecimal.valueOf(100.0), 10);
    product.setCategory(category);

    // Create product image and link it to product
    ProductImage productImage = new ProductImage("example.com", "test", true);
    productImage.setProduct(product); // Set product reference

    // Add product image to product's image list
    product.setImages(List.of(productImage));

    // Save product (cascading should persist productImage if configured)
    productRepository.save(product);

    // Assertions
    assertNotNull(product.getProductId(), "Product should have an ID after save.");
    assertEquals("Test Product", product.getName());

    // Verify the product image is saved and linked
    List<ProductImage> savedImages = productImageRepository.findAll();
    assertEquals(1, savedImages.size());
    assertEquals("example.com", savedImages.get(0).getUrl());
    assertEquals(product.getProductId(), savedImages.get(0).getProduct().getProductId());
  }

}
