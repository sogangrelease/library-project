package com.release.library;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //
        // 1. 웹 경로: /book-covers/** 로 들어오는 요청을 처리합니다.
        // 2. 로컬 경로: file:///C:/Library/book-covers/ 로 매핑합니다.
        registry.addResourceHandler("/book-covers/**")
                .addResourceLocations("file:///C:/Library/book-covers/");
    }
}
