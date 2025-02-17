package com.irmazda.autosparepart.exceptions.errors;

public class ProductImportError {
  private int rowNumber;
  private String errorMessage;

  public ProductImportError(int rowNumber, String errorMessage) {
    this.rowNumber = rowNumber;
    this.errorMessage = errorMessage;
  }

  public int getRowNumber() {
    return rowNumber;
  }

  public void setRowNumber(int rowNumber) {
    this.rowNumber = rowNumber;
  }

  public String getErrorMessage() {
    return errorMessage;
  }

  public void setErrorMessage(String errorMessage) {
    this.errorMessage = errorMessage;
  }
}
