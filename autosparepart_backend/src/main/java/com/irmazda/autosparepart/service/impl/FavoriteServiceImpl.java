package com.irmazda.autosparepart.service.impl;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

import com.irmazda.autosparepart.dto.favorite.FavoriteDTO;
import com.irmazda.autosparepart.maps.FavoriteMapper;
import com.irmazda.autosparepart.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
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

  Logger logger = LoggerFactory.getLogger(FavoriteServiceImpl.class);

  private final FavoriteRepository favoriteRepository;
  private final UserService userService;
  private final FavoriteMapper favoriteMapper;
  private final ProductRepository productRepository;

  public FavoriteServiceImpl(FavoriteRepository favoriteRepository,
                             UserService userService,
                             FavoriteMapper favoriteMapper,
                             ProductRepository productRepository) {
    this.favoriteRepository = favoriteRepository;
    this.userService = userService;
    this.favoriteMapper = favoriteMapper;
    this.productRepository = productRepository;
  }

  @Override
  public List<FavoriteDTO> getUserFavorites(Principal principal) {
    User user = userService.getUserFromPrincipal(principal);
    List<Favorite> favorites = favoriteRepository.findByUser_UserId(user.getUserId());
    return favorites.stream()
            .map(favorite -> new FavoriteDTO(
                    favorite.getFavoriteId(),
                    favorite.getProduct().getProductId().toString(),
                    favorite.getProduct().getName(),
                    favorite.getProduct().getPrice(),
                    favorite.getProduct().getImages().getFirst().getUrl()))
            .toList();
  }

  @Override
  @Transactional
  public FavoriteDTO addFavorite(UUID productId, Principal principal) {
    try {
      User user = userService.getUserFromPrincipal(principal);
      Product product = productRepository.findById(productId)
              .orElseThrow(() -> new RuntimeException("Product not found!"));

      Favorite favorite = new Favorite(user, product);
      Favorite saved = favoriteRepository.save(favorite);

      return favoriteMapper.mapTo(saved);
    } catch (DataIntegrityViolationException e) {
      throw new IllegalArgumentException("Product already in favorites");
    }
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
