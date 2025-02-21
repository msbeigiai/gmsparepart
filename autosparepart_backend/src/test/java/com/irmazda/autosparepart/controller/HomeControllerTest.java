package com.irmazda.autosparepart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import com.irmazda.autosparepart.config.SecurityConfig;
import org.junit.jupiter.api.Test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@WebMvcTest(HomeController.class)
@Import(SecurityConfig.class)
public class HomeControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Test
  public void returnsWelcomeWhenGetHome() throws Exception {
    mockMvc
            .perform(get("/home"))
            .andExpect(status().isOk())
            .andExpect(content().string("This is Home Page!"));
  }

  @Test
  @WithMockUser
  public void returnsMessageWhenGetSecureEndpoint() throws Exception {
    mockMvc
            .perform(get("/secure-home"))
            .andExpect(status().isOk())
            .andExpect(content().string("this is SECURE endpoint"));
  }
}
