package com.irmazda.autosparepart.service;

import java.security.Principal;
import java.util.List;

import com.irmazda.autosparepart.dto.address.AddressDTO;
import com.irmazda.autosparepart.dto.address.AddressRequest;

import javax.naming.AuthenticationException;

public interface AddressService {
  List<AddressDTO> getAddress(Principal principal);

  AddressDTO addAddress(AddressRequest request, Principal principal);

  AddressDTO updateAddress(Long addressId, AddressRequest request, Principal principal) throws AuthenticationException;

  void deleteAddress(Long addressId, Principal principal);
}
