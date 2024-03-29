package com.greenart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class WeatherInfoServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(WeatherInfoServiceApplication.class, args);
	}

}
