package com.irmazda.autosparepart.service;

import com.irmazda.autosparepart.dto.product.AddProductDTO;
import com.irmazda.autosparepart.dto.product.BulkImportResponse;
import com.irmazda.autosparepart.dto.product.ProductCreateRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface AdminProductService {
   List<String> uploadImages(UUID productId, List<MultipartFile> files) throws IOException;
   BulkImportResponse importProductsWithImages(MultipartFile excelFile, List<MultipartFile> imageFiles); 
   BulkImportResponse importProductsFromExcel(MultipartFile file);
   AddProductDTO addProduct(ProductCreateRequest productCreateRequestDTO);
}
