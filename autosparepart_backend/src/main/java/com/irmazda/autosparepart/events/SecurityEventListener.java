package com.irmazda.autosparepart.events;

import com.irmazda.autosparepart.entity.User;
import com.irmazda.autosparepart.entity.enums.UserRole;
import com.irmazda.autosparepart.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SecurityEventListener {
  Logger logger = LoggerFactory.getLogger(SecurityEventListener.class);

  private final UserService userService;
  private final Set<String> processedTokens = ConcurrentHashMap.newKeySet();

  public SecurityEventListener(UserService userService) {
    this.userService = userService;
  }

  @EventListener
  public void onAuthentication(AuthenticationSuccessEvent event) {
    if (event.getAuthentication() instanceof JwtAuthenticationToken) {
      JwtAuthenticationToken token = (JwtAuthenticationToken) event.getAuthentication();
      Map<String, Object> claims = token.getToken().getClaims();

      String email = (String) claims.get("email");
      String sub = (String) claims.get("sub");
      String username = (String) claims.get("preferred_username");

      logger.debug("Processing authentication event for user - sub: {}, email: {}", sub, email);

      if (!processedTokens.add(sub)) {
        logger.debug("Already processed authentication for user: {}", sub);
        return;
      }

      try {
        if (!userService.existsByUserId(sub)) {
          logger.info("Creating new user with sub: {}", sub);

          User user = new User(sub, email, UserRole.CUSTOMER);

          userService.save(user);

          logger.info("New user synced from Keycloak: {}", email);
        } else {
          logger.debug("User already exists with sub: {}", sub);
        }
      } catch (Exception e) {
        logger.error("Error processing user creation - sub: {}, error: {}", sub, e.getMessage(), e);
        processedTokens.remove(sub);
      }
    }
  }
}
