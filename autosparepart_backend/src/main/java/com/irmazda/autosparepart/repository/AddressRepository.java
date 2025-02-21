package com.irmazda.autosparepart.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.irmazda.autosparepart.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
  @Query("SELECT a FROM Address a WHERE a.user.userId = ?1")
  List<Address> findByUserId(String userId);

}
