package com.irmazda.autosparepart.service.impl;

import com.irmazda.autosparepart.dto.product.AddProductDTO;
import com.irmazda.autosparepart.dto.product.GetProductDTO;
import com.irmazda.autosparepart.dto.product.ProductCreateRequest;
import com.irmazda.autosparepart.entity.Category;
import com.irmazda.autosparepart.entity.Product;
import com.irmazda.autosparepart.maps.ProductMapper;
import com.irmazda.autosparepart.repository.CategoryRepository;
import com.irmazda.autosparepart.repository.ProductImageRepository;
import com.irmazda.autosparepart.repository.ProductRepository;
import com.irmazda.autosparepart.service.CloudinaryService;
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
                            ProductMapper productMapper,
                            CloudinaryService cloudinaryService) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
    this.productMapper = productMapper;
  }

  @Override
  public List<GetProductDTO> getAllProducts() {
    return productRepository.findAll()
            .stream()
            .map(productMapper::mapToGetProductDTO)
            .toList();
  }

  @Override
  public GetProductDTO getProductById(UUID productId) {
//    List<ProductImage> productImages = productImageRepository.findByProductId(productId)
//            .orElseThrow(() -> new RuntimeException("Product has no images"));
    return productRepository.findById(productId)
            .map(productMapper::mapToGetProductDTO)
            .orElseThrow(() -> new RuntimeException("Product not found"));
  }

  @Override
  public Long getProductCategoryCount(Long categoryId) {
    return productRepository.getProductCategoryCount(categoryId);
  }

  @Override
  public List<AddProductDTO> getProductsByCategory(Long categoryId) {
    List<Product> products = productRepository.getProductsByCategoryId(categoryId);
    return products.stream().map(productMapper::mapToAddProductDTO).toList();
  }

  @Override
  public List<AddProductDTO> getByCategoryIds(List<Long> categoryIds) {
    List<Product> products = productRepository.findByCategoryIds(categoryIds);
    return products.stream().map(productMapper::mapToAddProductDTO).toList();
  }
}
