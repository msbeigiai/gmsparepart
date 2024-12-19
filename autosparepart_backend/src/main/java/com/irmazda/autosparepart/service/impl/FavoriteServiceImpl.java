package com.irmazda.autosparepart.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.irmazda.autosparepart.entity.Favorite;
import com.irmazda.autosparepart.entity.Product;
import com.irmazda.autosparepart.entity.User;
import com.irmazda.autosparepart.repository.FavoriteRepository;
import com.irmazda.autosparepart.service.FavoriteService;

@Service
public class FavoriteServiceImpl implements FavoriteService {

  private final FavoriteRepository favoriteRepository;
  
  public FavoriteServiceImpl(FavoriteRepository favoriteRepository) {
    this.favoriteRepository = favoriteRepository;
  }
  
  @Override
  public List<Favorite> getUserFavorites(UUID userId) {
    return favoriteRepository.findByUser_UserId(userId);
  }

  @Override
  public Favorite addFavorite(UUID userId, UUID productId) {
    if (favoriteRepository.existsByUserAndProduct(userId, productId)) {
      throw new IllegalArgumentException("Product already in favorites");
    }

    Favorite favorite = new Favorite();
    favorite.setUser(new User(userId));
    favorite.setProduct(new Product(productId));

    return favoriteRepository.save(favorite);
  }

  @Override
  public void removeFavorite(UUID userId, UUID productId) {
    favoriteRepository.deleteByUserAndProduct(userId, productId);
  }

}
