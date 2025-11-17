package com.release.library.member;

import com.release.library.dto.MemberCreateDto;
import com.release.library.dto.PasswordChangeDto;
import com.release.library.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collections;
import java.util.Map;


@RequiredArgsConstructor
@RestController // ★ 중요: 모든 메서드가 JSON/API 응답을 하므로 @RestController로 변경
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;
    private final AuthenticationManager authenticationManager; // 주입
    private final JwtUtil jwtUtil; // 주입



    // --- 1. JWT 인증 API 추가 ---
    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody Map<String, String> loginRequest) {

        final String studentId = loginRequest.get("studentId");
        final String password = loginRequest.get("password");

        try {
            // ID/PW로 인증 시도 (MemberSecurityService의 loadUserByUsername이 호출됨)
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(studentId, password)
            );

            // 인증 성공: UserDetails를 얻어 JWT 토큰 생성
            final UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            final String jwt = jwtUtil.generateToken(userDetails);

            // 클라이언트에게 토큰을 JSON 형태로 반환
            // React는 이 토큰을 받아 LocalStorage 등에 저장하고, 이후 요청 시 사용
            return ResponseEntity.ok(Collections.singletonMap("token", jwt));

        } catch (Exception e) {
            // 인증 실패: ID/PW 불일치 등
            return ResponseEntity.status(401).body(Collections.singletonMap("message", "Invalid studentId or password"));
        }
    }


    // 2. 계정 생성 (관리자만 가능)
    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody MemberCreateDto memberCreateDto) {
        this.memberService.create(memberCreateDto.getStudentId(),
                                  memberCreateDto.getPassword(),
                                  memberCreateDto.getPhoneNumber(),
                                  memberCreateDto.getName());
        //성공 메시지를 포함한 200 OK 응답
        return ResponseEntity.ok("Account created successfully");
    }

    // 3. 비밀번호 변경
    @PostMapping("/changepw")
    public ResponseEntity<String> changePW(@Valid @RequestBody PasswordChangeDto dto, Principal principal) {

        Member member = this.memberService.getMember(principal.getName());

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if(!passwordEncoder.matches(dto.getOldpw(), member.getPasswordHash())){
            return ResponseEntity.status(400).body("기존 비밀번호가 일치하지 않습니다.");
        }

        // 비밀번호 변경 서비스 호출
        this.memberService.changePassword(member, dto.getNewpw());

        //다시 로그인
        return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요");
    }

}
