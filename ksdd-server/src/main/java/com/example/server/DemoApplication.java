package com.example.server;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class DemoApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	private final LogRepo logRepo;

	@GetMapping("/logs")
	public Page<TransformedLog> fetchBySpecification(@RequestParam(defaultValue = "0") Integer from,
													 @RequestParam(defaultValue = "30") Integer to) {
		int limit = to - from;
		var offsetBasedPageRequest = new OffsetBasedPageRequest(limit, from, "objId");
		return logRepo.findAll(offsetBasedPageRequest);
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("http://localhost:3000");
	}
}
