package com.irmazda.autosparepart.controller;

import java.net.URI;
import java.security.Principal;
import java.util.List;

import com.irmazda.autosparepart.dto.address.AddressRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

  @PostMapping
  public ResponseEntity<String> addAddress(@RequestBody AddressRequest request,
                                           Principal principal) {
    addressService.addAddress(request, principal);
    return ResponseEntity.created(URI.create("")).body("Address added successfully");
  }
}
