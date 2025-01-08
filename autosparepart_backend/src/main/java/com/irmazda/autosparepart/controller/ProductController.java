package com.irmazda.autosparepart.controller;

import com.irmazda.autosparepart.dto.product.ProductDTO;
import com.irmazda.autosparepart.dto.product.ProductRequestDTO;
import com.irmazda.autosparepart.dto.product.ProductResponseDTO;
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

  @PostMapping
  public ResponseEntity<ProductDTO> addProduct(@RequestBody ProductRequestDTO pRequestDTO) {
    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(productService.addProduct(pRequestDTO));
  }

  @GetMapping
  public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
    return ResponseEntity
            .status(HttpStatus.OK)
            .body(productService.getAllProducts());
  }

  @GetMapping("/{productId}")
  public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable UUID productId) {
    return ResponseEntity
            .status(HttpStatus.OK)
            .body(productService.getProductById(productId));
  }

}
