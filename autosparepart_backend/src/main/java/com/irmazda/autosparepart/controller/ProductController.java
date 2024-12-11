package com.irmazda.autosparepart.controller;

import com.irmazda.autosparepart.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.irmazda.autosparepart.dto.product.ProductRequestDTO;
import com.irmazda.autosparepart.dto.product.ProductResponseDTO;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

  private final ProductService productService;

  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  @PostMapping
  public ResponseEntity<ProductResponseDTO> addProduct(@RequestBody ProductRequestDTO pRequestDTO) {
    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(productService.addProduct(pRequestDTO));
  }

}
