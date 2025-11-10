package com.release.library.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {


    @Value("${jwt.secret}")
    private String secret;

    private Key getSigningKey() {
        // 시크릿 키를 기반으로 서명에 사용할 Key 객체를 생성합니다.
        byte[] keyBytes = secret.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // 1. 토큰 생성: 사용자 정보 (studentId)를 기반으로 JWT를 만듭니다.
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername()) // Subject: studentId
                .setIssuedAt(new Date(System.currentTimeMillis()))
                // 토큰 만료 시간 (예: 10시간)
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // 2. 토큰에서 사용자 이름 (studentId) 추출
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // 3. 토큰 유효성 검사: 사용자 ID 일치 및 만료되지 않았는지 확인
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // 4. 토큰 만료 여부 확인
    private Boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    // 5. 모든 클레임(Payload) 추출
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
    }
}
