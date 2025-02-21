package com.irmazda.autosparepart.service;

import java.security.Principal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import com.irmazda.autosparepart.config.KeycloakClient;
import com.irmazda.autosparepart.dto.user.KeycloakUserProfile;
import com.irmazda.autosparepart.dto.user.UserProfile;
import com.irmazda.autosparepart.entity.User;
import com.irmazda.autosparepart.repository.UserRepository;

@Service
@Transactional
public class UserService {
  Logger logger = LoggerFactory.getLogger(UserService.class);

  private final UserRepository userRepository;
  private final KeycloakClient keycloakClient;

  public UserService(UserRepository userRepository,
      KeycloakClient keycloakClient) {
    this.userRepository = userRepository;
    this.keycloakClient = keycloakClient;
  }

  public User getUserFromPrincipal(Principal principal) {
    if (principal instanceof JwtAuthenticationToken jwtAuthenticationToken) {
      String userId = (String) jwtAuthenticationToken.getTokenAttributes().get("sub");
      return userRepository.findByUserId(userId)
          .orElseThrow(() -> new RuntimeException("User not found"));
    }
    throw new RuntimeException("Invalid Principal type");
  }

  public boolean existsByUserId(String userId) {
    return userRepository.existsById(userId);
  }

  @Transactional(isolation = Isolation.SERIALIZABLE)
  @Retryable(maxAttempts = 3, backoff = @Backoff(delay = 100))
  public User save(User user) {
    if (existsByUserId(user.getUserId())) {
      logger.debug("User already exists: {}", user.getUserId());
      return userRepository.findByUserId(user.getUserId())
          .orElseThrow(() -> new IllegalStateException("User should exist but wasn't found"));
    }
    return userRepository.save(user);
  }

  public UserProfile getUserProfile(Principal principal) {
    User user = getUserFromPrincipal(principal);

    KeycloakUserProfile keycloakUserProfile = keycloakClient.getUserProfile(user.getUserId());

    return new UserProfile(
        user.getUserId(),
        user.getEmail(),
        user.getEmail(),
        user.getEmail(),
        user.getCreatedAt(),
        keycloakUserProfile.getAttributes());
  }
}
