package com.irmazda.autosparepart.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

  @Transactional
  public List<String> uploadPresetImages(List<MultipartFile> imageFiles, Map<String, String> uploadParams)
          throws IOException {
    List<String> imageUrls = new ArrayList<>();

    for (MultipartFile imageFile: imageFiles) {
      var uploadResult = cloudinary.uploader().upload(imageFile.getBytes(), uploadParams);
      imageUrls.add(uploadResult.get("secure_url").toString());
    }

    return imageUrls;
  }
}
