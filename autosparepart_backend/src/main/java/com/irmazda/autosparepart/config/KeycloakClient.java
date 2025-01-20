package com.irmazda.autosparepart.config;

import com.irmazda.autosparepart.dto.user.KeycloakUserProfile;
import jakarta.ws.rs.NotFoundException;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class KeycloakClient {
  private final Keycloak keycloak;
  private final String realm;


  public KeycloakClient(Keycloak keycloak,
                        @Value("{keycloak.realm}") String realm) {
    this.keycloak = keycloak;
    this.realm = realm;
  }

  public KeycloakUserProfile getUserProfile(String userId) {
    try {
      UserResource userResource = keycloak.realm(realm).users().get(userId);
      UserRepresentation keycloakUser = userResource.toRepresentation();

      return new KeycloakUserProfile(keycloakUser.getUsername(),
              keycloakUser.getLastName(),
              keycloakUser.getAttributes());
    } catch (NotFoundException e) {
      throw new UsernameNotFoundException("User not found in Keycloak", e);
    }
  }
}
