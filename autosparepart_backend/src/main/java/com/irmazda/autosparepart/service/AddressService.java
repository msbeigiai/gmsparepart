package com.irmazda.autosparepart.service;

import java.security.Principal;
import java.util.List;

import com.irmazda.autosparepart.entity.Address;

public interface AddressService {
  List<Address> getAddress(Principal principal);
}
