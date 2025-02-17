package com.irmazda.autosparepart.dto.product;

import com.irmazda.autosparepart.exceptions.errors.ProductImportError;

import java.util.List;

public class BulkImportResponse {
  private int successCount;
  private int errorCount;
  private List<ProductImportError> errors;

  public BulkImportResponse(int successCount, int errorCount, List<ProductImportError> errors) {
    this.successCount = successCount;
    this.errorCount = errorCount;
    this.errors = errors;
  }

  public int getSuccessCount() {
    return successCount;
  }

  public void setSuccessCount(int successCount) {
    this.successCount = successCount;
  }

  public int getErrorCount() {
    return errorCount;
  }

  public void setErrorCount(int errorCount) {
    this.errorCount = errorCount;
  }

  public List<ProductImportError> getErrors() {
    return errors;
  }

  public void setErrors(List<ProductImportError> errors) {
    this.errors = errors;
  }
}
