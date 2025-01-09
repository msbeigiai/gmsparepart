package com.irmazda.autosparepart.controller;

import com.irmazda.autosparepart.dto.favorite.FavoriteDTO;
import com.irmazda.autosparepart.entity.Favorite;
import com.irmazda.autosparepart.service.FavoriteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/favorites")
public class FavoriteController {

  private final FavoriteService favoriteService;

  public FavoriteController(FavoriteService favoriteService) {
    this.favoriteService = favoriteService;
  }

  @GetMapping
  public ResponseEntity<List<FavoriteDTO>> getUserFavorites(Principal principal) {
    return ResponseEntity.ok(favoriteService.getUserFavorites(principal));
  }

  @PostMapping("/add/{productId}")
  public ResponseEntity<String> addFavorite(@PathVariable UUID productId, Principal principal) {
    favoriteService.addFavorite(productId, principal);
    return new ResponseEntity<>("Product added to favorites successfully", HttpStatus.CREATED);
  }

  @DeleteMapping("/remove/{productId}")
  public void removeFavorite(@PathVariable UUID productId, Principal principal) {
    favoriteService.removeFavorite(productId, principal);
  }

}
