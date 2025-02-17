package com.irmazda.autosparepart.controller;


import com.irmazda.autosparepart.dto.product.AddProductDTO;
import com.irmazda.autosparepart.dto.product.ProductCreateRequest;
import com.irmazda.autosparepart.service.AdminProductService;
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

  private final AdminProductService adminProductService;

  public AdminProductController(AdminProductService adminProductService) {
    this.adminProductService = adminProductService;
  }

//  @PostMapping
//  public ResponseEntity<AddProductDTO> addProduct(@RequestBody ProductCreateRequest pRequestDTO) {
//    return ResponseEntity
//            .status(HttpStatus.CREATED)
//            .body(adminProductService.addProduct(pRequestDTO));
//  }

  @PostMapping("/{productId}/upload-images")
  public ResponseEntity<List<String>> uploadImages(@PathVariable UUID productId,
                                                   @RequestParam("files") List<MultipartFile> files) throws IOException {
    List<String> imageUrls = adminProductService.uploadImages(productId, files);
    return ResponseEntity.created(URI.create("")).body(imageUrls);
  }
}
