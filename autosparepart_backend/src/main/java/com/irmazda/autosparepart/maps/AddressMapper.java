package com.irmazda.autosparepart.maps;

import com.irmazda.autosparepart.dto.address.AddressDTO;
import com.irmazda.autosparepart.entity.Address;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {
  public AddressDTO mapTo(Address address) {
    return new AddressDTO(
            address.getAddressId(),
            address.getAddressLine1(),
            address.getCity(),
            address.getPostalCode(),
            address.getCountry(),
            address.isDefault()
    );
  }
}
