package com.irmazda.autosparepart.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class HomeController {

  @GetMapping("/home")
  public String getMethodName() {
      return "This is Home Page!";
  }
  
  @GetMapping("/secure-home")
  public String secureEndpoint() {
      return "this is SECURE endpoint";
  }
  
}
