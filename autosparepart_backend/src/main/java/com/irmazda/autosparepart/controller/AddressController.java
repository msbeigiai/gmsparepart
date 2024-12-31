package com.irmazda.autosparepart.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.irmazda.autosparepart.entity.Address;
import com.irmazda.autosparepart.service.AddressService;

@RestController
@RequestMapping("/api/v1/addresses")
public class AddressController {

  private final AddressService addressService;

  public AddressController(AddressService addressService) {
    this.addressService = addressService;
  }

  @GetMapping
  public ResponseEntity<List<Address>> getAddress(Principal principal) {
    return ResponseEntity.ok().body(addressService.getAddress(principal));
  }
}
