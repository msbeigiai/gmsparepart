package com.irmazda.autosparepart.service;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

import com.irmazda.autosparepart.dto.favorite.FavoriteDTO;

public interface FavoriteService {
  List<FavoriteDTO> getUserFavorites(Principal principal);

  FavoriteDTO addFavorite(UUID productId, Principal principal);

  void removeFavorite(UUID productId, Principal principal);
}
