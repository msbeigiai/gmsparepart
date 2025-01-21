package com.irmazda.autosparepart.maps;

import com.irmazda.autosparepart.dto.favorite.FavoriteDTO;
import com.irmazda.autosparepart.entity.Favorite;
import org.springframework.stereotype.Component;

@Component
public class FavoriteMapper {
  public FavoriteDTO mapTo(Favorite favorite) {
    return new FavoriteDTO(
            favorite.getFavoriteId(),
            favorite.getProduct().getProductId().toString(),
            favorite.getProduct().getName(),
            favorite.getProduct().getPrice(),
            favorite.getProduct().getImages().getFirst().getUrl()
    );
  }
}
