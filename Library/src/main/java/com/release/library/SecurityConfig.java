package com.release.library;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;



@Configuration //@Configuration :스프링 환경설정 파일임을 의미하는 어노테이션 => 여기서는 스프링 시큐리티 설정을 위해서 사용
@EnableWebSecurity //모든 요청 URL이 스프링 시큐리티 프레임워크의 통제를 받도록 하는 어노테이션
public class SecurityConfig {

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http
                .formLogin(
                        (formLogin) -> formLogin
                                .loginPage("/member/login")
                                .defaultSuccessUrl("/main")
                )
                .logout(
                        (logout) -> logout
                                .logoutUrl("/member/logout")
                                .logoutSuccessUrl("/member/login")
                                .invalidateHttpSession(true)
                )
                .authorizeHttpRequests(
                        (authorizeHttpRequests) ->  authorizeHttpRequests
                                //.requestMatchers("/todotitle/create").hasAuthority("ROLE_ADMIN")
                                //.requestMatchers("/todotitle/detail/**").authenticated()
                                .anyRequest().permitAll()
                )
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

