package com.irmazda.autosparepart.service.impl;

import com.irmazda.autosparepart.dto.product.AddProductDTO;
import com.irmazda.autosparepart.dto.product.BulkImportResponse;
import com.irmazda.autosparepart.dto.product.ProductCreateRequest;
import com.irmazda.autosparepart.entity.Category;
import com.irmazda.autosparepart.entity.Product;
import com.irmazda.autosparepart.entity.ProductImage;
import com.irmazda.autosparepart.exceptions.errors.ProductImportError;
import com.irmazda.autosparepart.maps.ProductMapper;
import com.irmazda.autosparepart.repository.CategoryRepository;
import com.irmazda.autosparepart.repository.ProductImageRepository;
import com.irmazda.autosparepart.repository.ProductRepository;
import com.irmazda.autosparepart.service.AdminProductService;
import com.irmazda.autosparepart.service.CloudinaryService;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class AdminProductServiceImpl implements AdminProductService {

    private final ProductRepository productRepository;
    private final CloudinaryService cloudinaryService;
    private final ProductImageRepository productImageRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    public AdminProductServiceImpl(ProductRepository productRepository,
                                   CloudinaryService cloudinaryService,
                                   ProductImageRepository productImageRepository,
                                   CategoryRepository categoryRepository,
                                   ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.cloudinaryService = cloudinaryService;
        this.productImageRepository = productImageRepository;
        this.categoryRepository = categoryRepository;
        this.productMapper = productMapper;
    }

    @Override
    @Transactional
    public List<String> uploadImages(UUID productId, List<MultipartFile> files) throws IOException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product with given ID not found."));
        List<String> imageUrls = cloudinaryService.uploadImages(files);
        List<ProductImage> images = imageUrls.stream().map(url -> {
            ProductImage image = new ProductImage();
            image.setAltText(product.getName());
            image.setUrl(url);
            image.setProduct(product);
            productImageRepository.save(image);
            return image;
        }).toList();

        product.getImages().addAll(images);
        productRepository.save(product);
        return imageUrls;
    }

    @Override
    @Transactional
    public BulkImportResponse importProductsFromExcel(MultipartFile file) {
        List<ProductImportError> errors = new ArrayList<>();
        List<Product> successfulImports = new ArrayList<>();

        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;

                try {
                    Product product = new Product();
                    product.setName(getCellValue(row.getCell(0)));
                    product.setDescription(getCellValue(row.getCell(1)));
                    product.setPrice(new BigDecimal(getCellValue(row.getCell(2))));
                    product.setStockQuantity((int) row.getCell(3).getNumericCellValue());
                    product.setBrand(getCellValue(row.getCell(4)));
                    product.setManufacturer(getCellValue(row.getCell(5)));
                    product.setCompatibility(getCellValue(row.getCell(6)));

                    String categoryName = getCellValue(row.getCell(7));
                    Category category = categoryRepository.findByName(categoryName)
                            .orElseThrow(() -> new RuntimeException("Category not found: " + categoryName));
                    product.setCategory(category);

                    productRepository.save(product);
                    successfulImports.add(product);
                } catch (Exception e) {
                    errors.add(new ProductImportError(row.getRowNum(), e.getMessage()));
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to process Excel file", e);
        }
        return new BulkImportResponse(
                successfulImports.size(),
                errors.size(),
                errors
        );
    }

    @Override
    public AddProductDTO addProduct(ProductCreateRequest productCreateRequest) {
        Category category = categoryRepository.findById(productCreateRequest.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found!"));

        Product product = new Product();
        product.setCategory(category);
        product.setDescription(productCreateRequest.getDescription());
        product.setName(productCreateRequest.getName());
        product.setPrice(productCreateRequest.getPrice());
        product.setStockQuantity(productCreateRequest.getStockQuantity());

        Product savedProduct = productRepository.save(product);

        return productMapper.mapToAddProductDTO(savedProduct);
    }

    private void processExcelWithImages(
            MultipartFile excelFile,
            Map<String, String> uploadedImages,
            List<Product> successfulImages,
            List<ProductImportError> errors) throws IOException {
        try (Workbook workbook = new XSSFWorkbook(excelFile.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;

                try {
                    var productIdentifier = getCellValue(row.getCell(0));
                    var product = createProductFromRow(row);

                    String imageUrl = uploadedImages.get(productIdentifier);
                    if (imageUrl != null) {
                        ProductImage productImage = new ProductImage(imageUrl, product.getName(), true);
                        product.addImage(productImage);
                    } else {
                        errors.add(new ProductImportError(row.getRowNum(), "No image found for this product!" + productIdentifier));
                    }

                    productRepository.save(product);
                    successfulImages.add(product);

                } catch (Exception e) {
                    errors.add(new ProductImportError(row.getRowNum(), e.getMessage()));
                }
            }
        }
    }

    private String extractIdentifier(String filename) {
        return filename.split("_")[0];
    }

    private String getCellValue(Cell cell) {
        if (cell == null) return "";

        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue().trim();
            case NUMERIC:
                return String.valueOf((int) cell.getNumericCellValue());
            default:
                return "";
        }
    }

    private Product createProductFromRow(Row row) {
        Category category = categoryRepository.findByName(row.getCell(8).getStringCellValue() )
                .orElseThrow(() -> new RuntimeException("Category not found!"));

        Product product = new Product();
        product.setSKU(row.getCell(0).getStringCellValue());
        product.setCategory(category);
        product.setDescription(row.getCell(2).getStringCellValue());
        product.setName(row.getCell(1).getStringCellValue());
        product.setPrice(BigDecimal.valueOf(Long.parseLong(row.getCell(3).getStringCellValue())));
        product.setStockQuantity(Integer.parseInt(row.getCell(4).getStringCellValue()));
        product.setBrand(row.getCell(5).getStringCellValue());
        product.setManufacturer(row.getCell(6).getStringCellValue());
        product.setCompatibility(row.getCell(7).getStringCellValue());

        return productRepository.save(product);
    }

}
