package com.irmazda.autosparepart.integration;


import com.irmazda.autosparepart.config.SecurityConfig;
import com.irmazda.autosparepart.dto.product.ProductImageDTO;
import com.irmazda.autosparepart.dto.product.ProductRequestDTO;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;

import java.math.BigDecimal;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Import(SecurityConfig.class)
public class ProductIntegrationTest {

  @LocalServerPort
  private int port;

  private String baseURI;

  @BeforeEach
  void setUp() {
    baseURI = "http://localhost:" + port; // Ensure the dynamic port is used
  }

  @Test
  void shouldAddProductSuccessfully() {
    // Arrange: Create a product request DTO
    ProductRequestDTO request = new ProductRequestDTO(
            "Test Product",
            "Product Description",
            BigDecimal.valueOf(100.0),
            5,
            "Engine Parts",
            List.of(
                    new ProductImageDTO("image1.com", "Main Image", true),
                    new ProductImageDTO("image2.com", "Side Image", false)
            )
    );

    // Replace with a valid JWT token (this should be dynamically generated or fetched)
    String token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ1TE1mZ1F3RXRUVS1SQ0NoS2FpbDNPS0g2RGE0QmFEMDF6cFN1RXB1cDRFIn0.eyJleHAiOjE3MzM5MjgxMjIsImlhdCI6MTczMzkyNjMyMiwianRpIjoiZTRlYmIwOTAtMjI0ZC00MzdiLWFhNDItMTYyNjYwN2Y0YzM5IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9pcm1hemRhIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjA4MGY0ZGI4LWM5ZDMtNDQ0Zi1iY2VlLWJlODk5YmQ0MDc1MyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImlybWF6ZGEtY2xpZW50Iiwic2lkIjoiZTI0ZTRmMGMtN2NiYi00YmYwLWEwMDctNjViYTU2ZjY4NTQ3IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsIkNVU1RPTUVSIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLWlybWF6ZGEiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vaHNlbiBTYWRlZ2hiZWlnaSIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QiLCJnaXZlbl9uYW1lIjoiTW9oc2VuIiwiZmFtaWx5X25hbWUiOiJTYWRlZ2hiZWlnaSIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSJ9.sKYAyxuo6f1Iac2nXq8QkM4tBdbNLyUQ_oaMPrwccYak69czmGh-UvyQPGlMbAlUivWhednpzYsh9-GClLo7N5tMiI3s552nCtJmcfcS3LVctYncoYHi6GfreuzHTNx2fybWqi0MLWQ5sS-z6yrFCZ1m3Fv2B3VgTdQFaUoj3OTZoEvRLOR3oZTZ4DkH2ic8BSaDrLoF9qTFNf3g6GC7DqilcOXSLuxajcOM5rs-W_O3WsoT8hjlwF4DYXsR7o79rwKdEqhMXsRtorywMKrk3DPwmqx0VOdArSOY1szjiVtBnprwjmsketIpz9M9eNTSMUuzXnNv_riVfgT0Ke4TwQ";

    // Act & Assert
    given()
            .baseUri(baseURI) // Make sure to use the dynamic base URI
            .contentType(ContentType.JSON)
            .header("Authorization", "Bearer " + token)
            .body(request)
            .when()
            .post("/api/v1/products") // Ensure this endpoint is correct
            .then()
            .statusCode(201)
            .body("name", equalTo("Test Product"))
            .body("price", equalTo(100.0f))
            .body("stockQuantity", equalTo(5))
            .body("description", equalTo("Product Description"));
  }
}