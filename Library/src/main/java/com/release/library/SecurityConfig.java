package com.release.library;

import com.release.library.security.JwtAuthenticationFilter;
import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.release.library.security.JwtAuthenticationFilter;

@Configuration //@Configuration :스프링 환경설정 파일임을 의미하는 어노테이션 => 여기서는 스프링 시큐리티 설정을 위해서 사용
@EnableWebSecurity //모든 요청 URL이 스프링 시큐리티 프레임워크의 통제를 받도록 하는 어노테이션
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http
                // 1. 폼 로그인 비활성화 (React가 로그인 요청을 API로 직접 처리)
                .formLogin(formLogin -> formLogin.disable())

                // 2. CSRF 비활성화 (토큰 기반 인증에서는 불필요)
                .csrf(csrf -> csrf.disable())

                // 3. 세션을 사용하지 않음 (Stateless)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // 4. 요청 권한 설정
                .authorizeHttpRequests(
                        (authorizeHttpRequests) ->  authorizeHttpRequests
                                // 로그인 API와 계정 생성 API는 인증 없이 접근 허용
                                .requestMatchers("/member/authenticate", "/member/create").permitAll()
                                .anyRequest().authenticated() // 그 외 모든 요청은 인증 필요
                )
                // 5. JWT 필터를 Spring Security의 기본 필터 이전에 추가하여 토큰 검증
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
        ;


        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    protected AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }


}