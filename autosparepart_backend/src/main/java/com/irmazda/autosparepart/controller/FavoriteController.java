package com.irmazda.autosparepart.controller;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.irmazda.autosparepart.entity.Favorite;
import com.irmazda.autosparepart.entity.User;
import com.irmazda.autosparepart.service.FavoriteService;
import com.irmazda.autosparepart.service.UserService;

@RestController
@RequestMapping("/api/v1/favorites")
public class FavoriteController {

  private final FavoriteService favoriteService;
  private final UserService userService;

  public FavoriteController(FavoriteService favoriteService, UserService userService) {
    this.favoriteService = favoriteService;
    this.userService = userService;
  }

  @GetMapping
  public List<Favorite> getUserFavorites(Principal principal) {
    User user = userService.getUserFromPrincipal(principal);
    return favoriteService.getUserFavorites(user.getUserId());
  }

  @PostMapping("/add/{productId}")
  public Favorite addFavorite(@PathVariable UUID productId, Principal principal) {
    User user = userService.getUserFromPrincipal(principal);
    return favoriteService.addFavorite(user.getUserId(), productId);
  }

  @DeleteMapping("/remove/{productId}")
  public void removeFavorite(@PathVariable UUID productId, Principal principal) {
    User user = userService.getUserFromPrincipal(principal);
    favoriteService.removeFavorite(user.getUserId(), productId);
  }

}
