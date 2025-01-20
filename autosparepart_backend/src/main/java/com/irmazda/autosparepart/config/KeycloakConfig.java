package com.irmazda.autosparepart.config;

import com.irmazda.autosparepart.events.SecurityEventListener;
import com.irmazda.autosparepart.service.UserService;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KeycloakConfig {
  @Bean
  public SecurityEventListener securityEventListener(UserService userService) {
    return new SecurityEventListener(userService);
  }

  @Bean
  public Keycloak keycloakAdminClient(
          @Value("${keycloak.auth-server-url}") String serverUrl,
          @Value("${keycloak.realm}") String realm,
          @Value("${keycloak.admin-cli.client-id}") String clientId,
          @Value("${keycloak.admin-cli.client-secret}") String clientSecret) {
    return KeycloakBuilder.builder()
            .serverUrl(serverUrl)
            .realm(realm)
            .clientId(clientId)
            .clientSecret(clientSecret)
            .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
            .build();
  }
}
