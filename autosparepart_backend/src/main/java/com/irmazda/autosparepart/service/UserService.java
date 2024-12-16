package com.irmazda.autosparepart.service;

import com.irmazda.autosparepart.entity.User;
import com.irmazda.autosparepart.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class UserService {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }


  public User getUserFromPrincipal(Principal principal) {
    // Implement user fetching logic
    return new User(); // Placeholder
  }
}
