package com.irmazda.autosparepart.service.impl;

import com.cloudinary.Cloudinary;
import com.irmazda.autosparepart.dto.product.AddProductDTO;
import com.irmazda.autosparepart.dto.product.BulkImportResponse;
import com.irmazda.autosparepart.dto.product.ProductCreateRequest;
import com.irmazda.autosparepart.entity.Category;
import com.irmazda.autosparepart.entity.Product;
import com.irmazda.autosparepart.entity.ProductImage;
import com.irmazda.autosparepart.exceptions.errors.ProductImageError;
import com.irmazda.autosparepart.exceptions.errors.ProductImportError;
import com.irmazda.autosparepart.maps.ProductMapper;
import com.irmazda.autosparepart.repository.CategoryRepository;
import com.irmazda.autosparepart.repository.ProductImageRepository;
import com.irmazda.autosparepart.repository.ProductRepository;
import com.irmazda.autosparepart.service.AdminProductService;
import com.irmazda.autosparepart.service.CloudinaryService;
import org.apache.commons.collections4.map.HashedMap;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;

@Service
public class AdminProductServiceImpl implements AdminProductService {

    @Value("${cloudinary.upload.preset}")
    private String uploadPreset;

    private final ProductRepository productRepository;
    private final CloudinaryService cloudinaryService;
    private final ProductImageRepository productImageRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;
    private final Cloudinary cloudinary;

    public AdminProductServiceImpl(ProductRepository productRepository,
                                   CloudinaryService cloudinaryService,
                                   ProductImageRepository productImageRepository,
                                   CategoryRepository categoryRepository,
                                   ProductMapper productMapper, Cloudinary cloudinary) {
        this.productRepository = productRepository;
        this.cloudinaryService = cloudinaryService;
        this.productImageRepository = productImageRepository;
        this.categoryRepository = categoryRepository;
        this.productMapper = productMapper;
        this.cloudinary = cloudinary;
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

    @Transactional
    public BulkImportResponse importProductsWithImages(MultipartFile excelFile, List<MultipartFile> imageFiles) {
        Map<String, String> uploadedImages = new HashMap<>();
        List<ProductImportError> errors = new ArrayList<>();
        List<Product> successfulImports = new ArrayList<>();

        try {
            uploadedImages = batchUploadImages(imageFiles);

            processExcelWithImages(excelFile, uploadedImages, successfulImports, errors);

        } catch (IOException e) {
            throw new RuntimeException("Failed to process import", e);
        }

        return new BulkImportResponse(
                successfulImports.size(),
                errors.size(),
                errors
        );

    }

    private Map<String, String> batchUploadImages(List<MultipartFile> imageFiles) throws IOException {
        Map<String, String> uploadedUrls = new HashMap<>();

        for (var imageFile : imageFiles) {
            var originalFileName = imageFile.getOriginalFilename();
            var identifier = extractIdentifier(Objects.requireNonNull(originalFileName));

            try {
                Map<String, String> uploadParams = new HashMap<>();

                uploadParams.put("upload_preset", uploadPreset);
                uploadParams.put("folder", "products");

                Map uploadResult = cloudinary.uploader().upload(imageFile.getBytes(), uploadParams);
                uploadedUrls.put(identifier, (String) uploadResult.get("secure_url"));

            } catch (IOException e) {
                throw new RuntimeException("Failed to upload image: " + originalFileName, e);
            }
        }

        return uploadedUrls;
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
    @Transactional
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

        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue().trim();
            case NUMERIC -> String.valueOf((int) cell.getNumericCellValue());
            default -> "";
        };
    }

    private Product createProductFromRow(Row row) {
        Category category = categoryRepository.findByName(row.getCell(8).getStringCellValue())
                .orElseThrow(() -> new RuntimeException("Category not found!"));

        Product product = new Product();
        product.setSKU(row.getCell(0).getStringCellValue());
        product.setCategory(category);
        product.setDescription(row.getCell(2).getStringCellValue());
        product.setName(row.getCell(1).getStringCellValue());
        product.setPrice(getValue(row.getCell(3)));
        product.setStockQuantity(getValue(row.getCell(4)).intValue());
        product.setBrand(row.getCell(5).getStringCellValue());
        product.setManufacturer(row.getCell(6).getStringCellValue());
        product.setCompatibility(row.getCell(7).getStringCellValue());

        return productRepository.save(product);
    }

    private BigDecimal getValue(Cell cell) {
        return switch (cell.getCellType()) {
            case NUMERIC -> BigDecimal.valueOf(cell.getNumericCellValue());
            case STRING -> new BigDecimal(cell.getStringCellValue());
            default -> throw new IllegalStateException("Unexpected value: " + cell.getCellType());
        };
    }

}
