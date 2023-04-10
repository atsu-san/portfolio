package net.suki2.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jdbc.repository.config.EnableJdbcAuditing;

@Configuration
@EnableJdbcAuditing
class Config {
	
	@Bean
	AuditorAware<String> auditorProvider() {
		return new AuditorAwareImpl();
	}
}
