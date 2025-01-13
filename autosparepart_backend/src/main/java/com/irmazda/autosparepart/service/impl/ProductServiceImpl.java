package com.irmazda.autosparepart.service.impl;

import com.irmazda.autosparepart.dto.product.ProductDTO;
import com.irmazda.autosparepart.dto.product.ProductRequest;
import com.irmazda.autosparepart.entity.Category;
import com.irmazda.autosparepart.entity.Product;
import com.irmazda.autosparepart.entity.ProductImage;
import com.irmazda.autosparepart.maps.ProductMapper;
import com.irmazda.autosparepart.repository.CategoryRepository;
import com.irmazda.autosparepart.repository.ProductImageRepository;
import com.irmazda.autosparepart.repository.ProductRepository;
import com.irmazda.autosparepart.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {

  private final ProductRepository productRepository;
  private final CategoryRepository categoryRepository;
  private final ProductMapper productMapper;

  public ProductServiceImpl(ProductRepository productRepository,
                            CategoryRepository categoryRepository,
                            ProductImageRepository productImageRepository,
                            ProductMapper productMapper) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
    this.productMapper = productMapper;
  }

  @Override
  public ProductDTO addProduct(ProductRequest productRequest) {
    Category category = categoryRepository.findByName(productRequest.getCategoryName())
            .orElseGet(() -> new Category(productRequest.getCategoryName()));

    Product product = new Product();
    product.setCategory(category);
    product.setDescription(productRequest.getDescription());
    product.setName(productRequest.getName());
    product.setPrice(productRequest.getPrice());
    product.setStockQuantity(productRequest.getStock());

    productRequest.getImages().forEach(imgRequest -> {
      ProductImage image = new ProductImage();
      image.setUrl(imgRequest.getUrl());
      image.setAltText(imgRequest.getAltText());
      image.setMainImage(imgRequest.isMainImage());
      product.addImage(image);
    });

    Product savedProduct = productRepository.save(product);

    return productMapper.mapTo(savedProduct);
  }

  @Override
  public List<ProductDTO> getAllProducts() {
    return productRepository.findAll()
            .stream()
            .map(productMapper::mapTo)
            .toList();
  }

  @Override
  public ProductDTO getProductById(UUID productId) {
    return productRepository.findById(productId)
            .map(productMapper::mapTo)
            .orElseThrow(() -> new RuntimeException("Product not found"));
  }

  @Override
  public Long getProductCategoryCount(Long categoryId) {
    return productRepository.getProductCategoryCount(categoryId);
  }

  @Override
  public List<ProductDTO> getProductsByCategory(Long categoryId) {
    List<Product> products = productRepository.getProductsByCategoryId(categoryId);
    return products.stream().map(productMapper::mapTo).toList();
  }

  @Override
  public List<ProductDTO> getByCategoryIds(List<Long> categoryIds) {
    List<Product> products = productRepository.findByCategoryIds(categoryIds);
    return products.stream().map(productMapper::mapTo).toList();
  }

}
