package com.example.server;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;
import java.util.Map;

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
			@RequestParam(defaultValue = "30") Integer to,
			@RequestParam Map<String, String> filter) {
		System.out.println(filter);
		int limit = to - from;
		OffsetBasedPageRequest offsetBasedPageRequest = new OffsetBasedPageRequest(limit, from, "objId");
		Specification<TransformedLog> specification = new SpecResolver(filter).resolve();
		Page<TransformedLog> result = logRepo.findAll(specification, offsetBasedPageRequest);
		result.get().forEach(System.out::println);
		return result;
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("http://localhost:3000");
	}
}