package com.irmazda.autosparepart.audit;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

@Component("AuditAwareImpl")
public class AuditAwareImpl<T> implements AuditorAware<String> {
  @Override
  public Optional<String> getCurrentAuditor() {
    return Optional.of("test");
  }
}
