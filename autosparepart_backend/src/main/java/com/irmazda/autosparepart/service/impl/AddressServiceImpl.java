package com.irmazda.autosparepart.service.impl;

import java.security.Principal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.irmazda.autosparepart.entity.Address;
import com.irmazda.autosparepart.entity.User;
import com.irmazda.autosparepart.repository.AddressRepository;
import com.irmazda.autosparepart.service.AddressService;
import com.irmazda.autosparepart.service.UserService;

@Service
public class AddressServiceImpl implements AddressService {

  private final UserService userService;
  private final AddressRepository addressRepository;

  public AddressServiceImpl(UserService userService, AddressRepository addressRepository) {
    this.userService = userService;
    this.addressRepository = addressRepository;
  }

  @Override
  public List<Address> getAddress(Principal principal) {
    User user = userService.getUserFromPrincipal(principal);
    return addressRepository.findByUserId(user.getUserId());
  }

}
