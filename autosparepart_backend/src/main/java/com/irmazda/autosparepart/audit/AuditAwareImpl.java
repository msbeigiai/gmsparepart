package com.irmazda.autosparepart.audit;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component("AuditAwareImpl")
public class AuditAwareImpl<T> implements AuditorAware<String> {
  @Override
  public Optional<String> getCurrentAuditor() {
    SecurityContext context = SecurityContextHolder.getContext();
    return Optional.of(context.getAuthentication().getName());
  }
}
