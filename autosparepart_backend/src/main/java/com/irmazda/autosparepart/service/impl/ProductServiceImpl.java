package com.irmazda.autosparepart.service.impl;

import com.irmazda.autosparepart.dto.product.ProductRequestDTO;
import com.irmazda.autosparepart.dto.product.ProductResponseDTO;
import com.irmazda.autosparepart.entity.Category;
import com.irmazda.autosparepart.entity.Product;
import com.irmazda.autosparepart.entity.ProductImage;
import com.irmazda.autosparepart.maps.ProductToProductResponseDTO;
import com.irmazda.autosparepart.repository.CategoryRepository;
import com.irmazda.autosparepart.repository.ProductImageRepository;
import com.irmazda.autosparepart.repository.ProductRepository;
import com.irmazda.autosparepart.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

  private final ProductRepository productRepository;
  private final CategoryRepository categoryRepository;

  public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository,
                            ProductImageRepository productImageRepository) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
  }

  @Override
  public ProductResponseDTO addProduct(ProductRequestDTO productRequestDTO) {
    Category category = categoryRepository.findByName(productRequestDTO.getCategoryName())
            .orElseGet(() -> new Category(productRequestDTO.getCategoryName()));

    Product product = new Product();
    product.setCategory(category);
    product.setDescription(productRequestDTO.getDescription());
    product.setName(productRequestDTO.getName());
    product.setPrice(productRequestDTO.getPrice());
    product.setStockQuantity(productRequestDTO.getStock());

    productRequestDTO.getImages().forEach(imgRequest -> {
      ProductImage image = new ProductImage();
      image.setUrl(imgRequest.getUrl());
      image.setAltText(imgRequest.getAltText());
      image.setMainImage(imgRequest.isMainImage());
      product.addImage(image);
    });

    Product savedProduct = productRepository.save(product);

    return ProductToProductResponseDTO.mapFrom(savedProduct);
  }

  @Override
  public List<ProductResponseDTO> getAllProducts() {
    return productRepository.findAll()
            .stream()
            .map(ProductToProductResponseDTO::mapFrom)
            .toList();
  }

}
