package com.irmazda.autosparepart.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.irmazda.autosparepart.config.SecurityConfig;
import com.irmazda.autosparepart.dto.product.ProductDTO;
import com.irmazda.autosparepart.dto.product.ProductImageDTO;
import com.irmazda.autosparepart.dto.product.ProductRequest;
import com.irmazda.autosparepart.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(ProductController.class)
@Import(SecurityConfig.class)
public class ProductControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockitoBean
  private ProductService productService;

  @InjectMocks
  private ProductController productController;

  @Autowired
  private ObjectMapper objectMapper;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

//  @Test
//  @WithMockUser
//  void shouldAddProductSuccessfully() throws Exception {
//    // Arrange
//    ProductRequest request = new ProductRequest(
//            "Test Product",
//            "Product Description",
//            BigDecimal.valueOf(100.0),
//            10,
//            "Engine Parts",
//            List.of(
//                    new ProductImageDTO("image1.com", "Main Image", true),
//                    new ProductImageDTO("image2.com", "Side Image", false)
//            )
//    );
//
//    ProductDTO response = new ProductDTO(
//            "Test Product",
//            "Engine Parts",
//            BigDecimal.valueOf(100.0),
//            10
//    );
//    when(productService.addProduct(any(ProductRequest.class))).thenReturn(response);
//
//    var token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ1TE1mZ1F3RXRUVS1SQ0NoS2FpbDNPS0g2RGE0QmFEMDF6cFN1RXB1cDRFIn0.eyJleHAiOjE3MzM5MjY5MTksImlhdCI6MTczMzkyNTExOSwianRpIjoiNDliYTJjZDItMmFlOC00MzhmLWJlNmUtNTU0NTA4MjFmZjVmIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9pcm1hemRhIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjA4MGY0ZGI4LWM5ZDMtNDQ0Zi1iY2VlLWJlODk5YmQ0MDc1MyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImlybWF6ZGEtY2xpZW50Iiwic2lkIjoiYjU4YWNmM2EtY2UxMS00YTBhLWE1NjAtZDNhNGM5N2FiZmM5IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsIkNVU1RPTUVSIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLWlybWF6ZGEiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vaHNlbiBTYWRlZ2hiZWlnaSIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QiLCJnaXZlbl9uYW1lIjoiTW9oc2VuIiwiZmFtaWx5X25hbWUiOiJTYWRlZ2hiZWlnaSIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSJ9.ZD7IJvk1X6HzSOIxoIror7upPKx-a9OjIZD7Zf8DK_j-zKfpKB1m8ye00TXcnBaUXQ_bU3vAlRAL4TtsqTPm4nQKaooinpEKjCiyRwrhNxt5TtkWb04ESZSrqN6ULvMXTOxSvkYnFN72k2t3DxNn0AB9FaqxO2Z_kfcDN9zeRYv-t5cuVZ_1QI_pjq9r5hasnbN_5w5w7l6rkZtuSSfexqdKprsdwhbSlKeBlh2W3ulAVSxOXyfs65PITRqgDAeh3_YCmV0xwPGlxwNfqfIgTpAFnl-lw2iVVBuGJzyEBvbi8v-XHrL64VsRACoqI2zYysufV3mgs53e2kKzikkySw";
//    // Act & Assert
//    mockMvc.perform(post("/api/v1/products")
////                    .header("Authorization", "Bearer " + token) // Add valid JWT token here
//                    .contentType(MediaType.APPLICATION_JSON)
//                    .content(objectMapper.writeValueAsString(request)))
//            .andExpect(status().isCreated())
//            .andExpect(jsonPath("$.name").value("Test Product"))
//            .andExpect(jsonPath("$.price").value(100.0))
//            .andExpect(jsonPath("$.stockQuantity").value(10))
//            .andExpect(jsonPath("$.description").value("Engine Parts"));
//    verify(productService, times(1)).addProduct(any(ProductRequest.class));
//
//  }
}
