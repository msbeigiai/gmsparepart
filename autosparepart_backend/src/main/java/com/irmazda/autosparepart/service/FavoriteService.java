package com.irmazda.autosparepart.service;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

import com.irmazda.autosparepart.dto.favorite.FavoriteDTO;
import com.irmazda.autosparepart.entity.Favorite;

public interface FavoriteService {
  List<FavoriteDTO> getUserFavorites(Principal principal);
  Favorite addFavorite(UUID productId, Principal principal);
  void removeFavorite(UUID productId, Principal principal);
}
