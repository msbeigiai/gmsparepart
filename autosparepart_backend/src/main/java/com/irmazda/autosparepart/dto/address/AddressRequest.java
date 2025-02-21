package com.irmazda.autosparepart.dto.address;

public class AddressRequest {
  private String addressLine1;
  private String city;
  private String postalCode;

  public AddressRequest(String addressLine1,
                        String city,
                        String postalCode) {
    this.addressLine1 = addressLine1;
    this.city = city;
    this.postalCode = postalCode;
  }

  public String getAddressLine1() {
    return addressLine1;
  }

  public void setAddressLine1(String addressLine1) {
    this.addressLine1 = addressLine1;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getPostalCode() {
    return postalCode;
  }

  public void setPostalCode(String postalCode) {
    this.postalCode = postalCode;
  }
}


