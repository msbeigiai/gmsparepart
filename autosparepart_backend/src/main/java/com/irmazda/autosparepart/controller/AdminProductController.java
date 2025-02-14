package com.irmazda.autosparepart.controller;


import com.irmazda.autosparepart.dto.product.AddProductDTO;
import com.irmazda.autosparepart.dto.product.ProductRequest;
import com.irmazda.autosparepart.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/products")
@PreAuthorize("hasRole('ADMIN')")
public class AdminProductController {

  private final ProductService productService;

  public AdminProductController(ProductService productService) {
    this.productService = productService;
  }

  @PostMapping
  public ResponseEntity<AddProductDTO> addProduct(@RequestBody ProductRequest pRequestDTO) {
    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(productService.addProduct(pRequestDTO));
  }

  @PostMapping("/{productId}/upload-images")
  public ResponseEntity<List<String>> uploadImages(@PathVariable UUID productId,
                                                   @RequestParam("files") List<MultipartFile> files) throws IOException {
    List<String> imageUrls = productService.uploadImages(productId, files);
    return ResponseEntity.created(URI.create("")).body(imageUrls);
  }
}
