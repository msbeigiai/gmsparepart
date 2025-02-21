package com.irmazda.autosparepart.maps;

import com.irmazda.autosparepart.dto.product.AddProductDTO;
import com.irmazda.autosparepart.dto.product.GetProductDTO;
import com.irmazda.autosparepart.entity.Product;
import com.irmazda.autosparepart.entity.ProductImage;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {
  public AddProductDTO mapToAddProductDTO(Product product) {
    AddProductDTO addProductDTO = new AddProductDTO();
    addProductDTO.setProductId(product.getProductId());
    addProductDTO.setDescription(product.getDescription());
    addProductDTO.setName(product.getName());
    addProductDTO.setPrice(product.getPrice());
    addProductDTO.setStockQuantity(product.getStockQuantity());
    addProductDTO.setCategoryId(product.getCategory().getCategoryId());
    addProductDTO.setCategoryName(product.getCategory().getName());
    addProductDTO.setBrand(product.getBrand());
    addProductDTO.setManufacturer(product.getManufacturer());
    addProductDTO.setCompatibility(product.getCompatibility());
    return addProductDTO;
  }

  public GetProductDTO mapToGetProductDTO(Product product) {
    GetProductDTO getProductDTO = new GetProductDTO();
    getProductDTO.setProductId(product.getProductId());
    getProductDTO.setDescription(product.getDescription());
    getProductDTO.setName(product.getName());
    getProductDTO.setPrice(product.getPrice());
    getProductDTO.setStockQuantity(product.getStockQuantity());
    getProductDTO.setCategoryId(product.getCategory().getCategoryId());
    getProductDTO.setCategoryName(product.getCategory().getName());
    getProductDTO.setBrand(product.getBrand());
    getProductDTO.setManufacturer(product.getManufacturer());
    getProductDTO.setCompatibility(product.getCompatibility());
    getProductDTO.setImageUrls(product.getImages().stream().map(ProductImage::getUrl).toList());
    return getProductDTO;
  }
}
