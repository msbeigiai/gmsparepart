package com.irmazda.autosparepart.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.irmazda.autosparepart.entity.base.BaseEntityCreateUpdate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "addresses")
public class Address extends BaseEntityCreateUpdate {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "address_id", updatable = false, nullable = false)
  private Long addressId;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  @JsonIgnore
  private User user;

  @Column(name = "address_line1", nullable = false)
  private String addressLine1;

  @Column(name = "city", nullable = false)
  private String city;

  @Column(name = "postal_code")
  private String postalCode;

  @Column(name = "country", nullable = false)
  private String country = "Iran";

  public Address() {
  }

  public Address(User user, String addressLine1, String city, String postalCode) {
    this.user = user;
    this.addressLine1 = addressLine1;
    this.city = city;
    this.postalCode = postalCode;
  }

  public Long getAddressId() {
    return addressId;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
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
