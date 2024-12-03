package com.irmazda.autosparepart.repository;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "Users")
public class User {

  private UUID userId;

}
