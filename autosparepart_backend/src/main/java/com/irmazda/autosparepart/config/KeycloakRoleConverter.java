package com.irmazda.autosparepart.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class KeycloakRoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {
  private final JwtGrantedAuthoritiesConverter converter = new JwtGrantedAuthoritiesConverter();

  @Override
  public Collection<GrantedAuthority> convert(Jwt jwt) {
    var authorities = converter.convert(jwt);

    List<GrantedAuthority> realmRoles =
            ((List<String>) jwt.getClaimAsMap("realm_access").get("roles")).stream()
                    .map(role -> "ROLE_" + role).map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());
    authorities.addAll(realmRoles);
    return authorities;
  }
}
