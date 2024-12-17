package com.irmazda.autosparepart.service;

import com.irmazda.autosparepart.entity.User;
import com.irmazda.autosparepart.repository.UserRepository;
import org.keycloak.KeycloakPrincipal;
import org.springframework.stereotype.Service;


import java.security.Principal;
import java.util.UUID;

@Service
public class UserService {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public User getUserFromPrincipal(Principal principal) {
    if (principal instanceof KeycloakPrincipal<?> keycloakPrincipal) {
      String userId = keycloakPrincipal.getKeycloakSecurityContext().getToken().getSubject();
      return userRepository.findById(UUID.fromString(userId))
              .orElseThrow(() -> new RuntimeException("User not found"));
    }
    throw new RuntimeException("Invalid Principal type");
  }
}
