package com.irmazda.autosparepart.maps;

import com.irmazda.autosparepart.dto.review.ReviewMediaDTO;
import com.irmazda.autosparepart.entity.ReviewMedia;

public class MediaTypeMapper {
  public ReviewMediaDTO toDTO(ReviewMedia reviewMedia) {
    return new ReviewMediaDTO(
            reviewMedia.getId(),
            reviewMedia.getMediaType().toString(),
            reviewMedia.getMediaUrl(),
            reviewMedia.getThumbnailUrl()
    );
  }
}
