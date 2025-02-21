package com.irmazda.autosparepart.controller;

import com.irmazda.autosparepart.dto.favorite.FavoriteDTO;
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
  public ResponseEntity<FavoriteDTO> addFavorite(@PathVariable UUID productId, Principal principal) {
    return ResponseEntity.created(URI.create("")).body(favoriteService.addFavorite(productId, principal));
  }

  @DeleteMapping("/delete/{productId}")
  public ResponseEntity<String> deleteFavorite(@PathVariable UUID productId, Principal principal) {
    favoriteService.removeFavorite(productId, principal);
    return new ResponseEntity<>(productId.toString(), HttpStatus.NO_CONTENT);
  }

}
