package com.irmazda.autosparepart.service.impl;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

import com.irmazda.autosparepart.dto.favorite.FavoriteDTO;
import org.springframework.stereotype.Service;

import com.irmazda.autosparepart.entity.Favorite;
import com.irmazda.autosparepart.entity.Product;
import com.irmazda.autosparepart.entity.User;
import com.irmazda.autosparepart.repository.FavoriteRepository;
import com.irmazda.autosparepart.service.FavoriteService;
import com.irmazda.autosparepart.service.UserService;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FavoriteServiceImpl implements FavoriteService {

  private final FavoriteRepository favoriteRepository;
  private final UserService userService;

  public FavoriteServiceImpl(FavoriteRepository favoriteRepository, UserService userService) {
    this.favoriteRepository = favoriteRepository;
    this.userService = userService;
  }

  @Override
  public List<FavoriteDTO> getUserFavorites(Principal principal) {
    User user = userService.getUserFromPrincipal(principal);
    List<Favorite> favorites = favoriteRepository.findByUser_UserId(user.getUserId());
    return favorites.stream()
            .map(favorite -> new FavoriteDTO(favorite.getProduct().getProductId().toString())).toList();
  }

  @Override
  public void addFavorite(UUID productId, Principal principal) {
    User user = userService.getUserFromPrincipal(principal);
    if (favoriteRepository.existsByUserAndProduct(user.getUserId(), productId)) {
      throw new IllegalArgumentException("Product already in favorites");
    }

    Favorite favorite = new Favorite();
    favorite.setUser(new User(user.getUserId()));
    favorite.setProduct(new Product(productId));

    favoriteRepository.save(favorite);
  }

  @Override
  @Transactional
  public void removeFavorite(UUID productId, Principal principal) {
    User user = userService.getUserFromPrincipal(principal);
    if (favoriteRepository.existsByUserAndProduct(user.getUserId(), productId)) {
      favoriteRepository.deleteByUserAndProduct(user.getUserId(), productId);
    } else {
      throw new IllegalArgumentException("Product is not in favorite list");
    }
  }
}
