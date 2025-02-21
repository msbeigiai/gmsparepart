package com.irmazda.autosparepart.controller;

import com.irmazda.autosparepart.dto.product.AddProductDTO;
import com.irmazda.autosparepart.dto.product.GetProductDTO;
import com.irmazda.autosparepart.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

  private final ProductService productService;

  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  @GetMapping
  public ResponseEntity<List<GetProductDTO>> getAllProducts() {
    return ResponseEntity
        .status(HttpStatus.OK)
        .body(productService.getAllProducts());
  }

  @GetMapping("/{productId}")
  public ResponseEntity<GetProductDTO> getProductById(@PathVariable UUID productId) {
    return ResponseEntity
        .status(HttpStatus.OK)
        .body(productService.getProductById(productId));
  }

  @GetMapping("/{categoryId}/count")
  public ResponseEntity<Long> getProductCategoryCount(@PathVariable Long categoryId) {
    return ResponseEntity.ok(productService.getProductCategoryCount(categoryId));
  }

  @GetMapping("/category/{categoryId}")
  public ResponseEntity<List<AddProductDTO>> getProductsByCategory(@PathVariable Long categoryId) {
    return ResponseEntity.ok(productService.getProductsByCategory(categoryId));
  }

  @GetMapping("/categories")
  public ResponseEntity<List<AddProductDTO>> getByCategoryIds(@RequestParam("categoryIds") List<Long> categoryIds) {
    return ResponseEntity.ok(productService.getByCategoryIds(categoryIds));
  }

}
