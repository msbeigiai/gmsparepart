package com.irmazda.autosparepart.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class CloudinaryService {
  private final Cloudinary cloudinary;

  public CloudinaryService(Cloudinary cloudinary) {
    this.cloudinary = cloudinary;
  }

  @Transactional
  public List<String> uploadImages(List<MultipartFile> files) throws IOException {
    List<String> imageUrls = new ArrayList<>();
    for (MultipartFile file : files) {
      Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
      imageUrls.add(uploadResult.get("secure_url").toString());
    }

    return imageUrls;
  }
}
