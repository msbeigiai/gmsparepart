package com.irmazda.autosparepart.service;

import java.util.List;
import java.util.UUID;

import com.irmazda.autosparepart.entity.Favorite;

public interface FavoriteService {
  List<Favorite> getUserFavorites(UUID userId);
  Favorite addFavorite(UUID userId, UUID productId);
  void removeFavorite(UUID userId, UUID productId);
}
