package com.irmazda.autosparepart.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.irmazda.autosparepart.entity.Category;
import com.irmazda.autosparepart.entity.Product;
import com.irmazda.autosparepart.entity.ProductImage;

import io.restassured.RestAssured;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ProductRepositoryTest extends AbstractTestContainer {

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private CategoryRepository categoryRepository;

  @Autowired
  private ProductImageRepository productImageRepository;

  @BeforeEach
  void setUp() {
    RestAssured.baseURI = "http://localhost:" + port;
    productRepository.deleteAll();
  }

  @Test
  public void shouldAddNewProduct() {
    Category category = new Category();
    category.setName("Engine Parts");
    categoryRepository.save(category);

    Product product = new Product("Test Product", "Description", BigDecimal.valueOf(100.0), 10);
    product.setCategory(category);

    ProductImage productImage = new ProductImage("example.com", "test", true);
    productImage.setProduct(product);

    product.setImages(List.of(productImage));

    productRepository.save(product);

    assertNotNull(product.getProductId(), "Product should have an ID after save.");
    assertEquals("Test Product", product.getName());

    List<ProductImage> savedImages = productImageRepository.findAll();
    assertEquals(1, savedImages.size());
    assertEquals("example.com", savedImages.get(0).getUrl());
    assertEquals(product.getProductId(), savedImages.get(0).getProduct().getProductId());
  }

}
