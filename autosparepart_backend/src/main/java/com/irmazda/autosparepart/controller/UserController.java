package com.irmazda.autosparepart.controller;

import com.irmazda.autosparepart.dto.user.UserProfile;
import com.irmazda.autosparepart.entity.User;
import com.irmazda.autosparepart.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/my-profile")
  public ResponseEntity<?> getUserProfile(Principal principal) {
    if (principal instanceof JwtAuthenticationToken jwtAuthenticationToken) {
      String userId = (String) jwtAuthenticationToken.getTokenAttributes().get("sub");
      return ResponseEntity.ok(userService.getUserProfile(principal));
    }

    return ResponseEntity.badRequest().body("No user found");
  }
}