package com.irmazda.autosparepart.service.impl;

import java.security.Principal;
import java.util.List;

import com.irmazda.autosparepart.dto.address.AddressDTO;
import com.irmazda.autosparepart.dto.address.AddressRequest;
import com.irmazda.autosparepart.maps.AddressMapper;
import org.springframework.stereotype.Service;

import com.irmazda.autosparepart.entity.Address;
import com.irmazda.autosparepart.entity.User;
import com.irmazda.autosparepart.repository.AddressRepository;
import com.irmazda.autosparepart.service.AddressService;
import com.irmazda.autosparepart.service.UserService;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.AuthenticationException;

@Service
public class AddressServiceImpl implements AddressService {

  private final UserService userService;
  private final AddressRepository addressRepository;
  private final AddressMapper addressMapper;

  public AddressServiceImpl(UserService userService,
                            AddressRepository addressRepository,
                            AddressMapper addressMapper) {
    this.userService = userService;
    this.addressRepository = addressRepository;
    this.addressMapper = addressMapper;
  }

  @Override
  public List<AddressDTO> getAddress(Principal principal) {
    User user = userService.getUserFromPrincipal(principal);
    List<Address> userAddresses = addressRepository.findByUserId(user.getUserId());
    return userAddresses
            .stream()
            .map(addressMapper::mapTo)
            .toList();
  }

  @Override
  @Transactional
  public AddressDTO addAddress(AddressRequest request, Principal principal) {
    User user = userService.getUserFromPrincipal(principal);
    Address newAddress = new Address(user, request.getAddressLine1(), request.getCity(), request.getPostalCode());
    Address savedAddress = addressRepository.save(newAddress);
    return addressMapper.mapTo(savedAddress);
  }

  @Override
  public AddressDTO updateAddress(Long addressId, AddressRequest request, Principal principal)
          throws AuthenticationException {

    User user = userService.getUserFromPrincipal(principal);

    Address maybeAddress = addressRepository.findById(addressId)
            .orElseThrow(() -> new RuntimeException("No address with this id found!"));

    if (maybeAddress.getUser() == user) {

    maybeAddress.setAddressLine1(request.getAddressLine1());
    maybeAddress.setCity(request.getCity());
    maybeAddress.setPostalCode(request.getPostalCode());
    } else {
      throw new AuthenticationException("User need to login");
    }

    addressRepository.save(maybeAddress);

    return addressMapper.mapTo(maybeAddress);
  }

  @Override
  @Transactional
  public void deleteAddress(Long addressId, Principal principal) {

    Address maybeAddress = addressRepository.findById(addressId)
            .orElseThrow(() -> new RuntimeException("No address with this id found!"));

    addressRepository.delete(maybeAddress);
  }


}
