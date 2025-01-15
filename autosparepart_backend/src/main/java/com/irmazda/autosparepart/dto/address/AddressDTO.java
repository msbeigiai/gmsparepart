package com.irmazda.autosparepart.dto.address;

public class AddressDTO {
  private Long addressId;
  private String addressLine1;
  private String city;
  private String postalCode;
  private String country;

  public AddressDTO(Long addressId,
                    String addressLine1,
                    String city,
                    String postalCode,
                    String country) {
    this.addressId = addressId;
    this.addressLine1 = addressLine1;
    this.city = city;
    this.postalCode = postalCode;
    this.country = country;
  }

  public Long getAddressId() {
    return addressId;
  }

  public void setAddressId(Long addressId) {
    this.addressId = addressId;
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

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }
}
