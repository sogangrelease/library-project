package com.release.library.member;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MemberSecurityService implements UserDetailsService{
    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String studentId) throws UsernameNotFoundException{
        // 1. 회원 검색 => findByUsername
        Optional <Member> m = this.memberRepository.findByStudentId(studentId);

        // 2. 멤버 없다면
        if(m.isEmpty()){
            throw new UsernameNotFoundException("존재하지 않는 회원입니다.");
        }

        // 3. 멤버 있다면
        Member member = m.get();

        // 4. 권한 부여를 위한 리스트 생성
        List<GrantedAuthority> authorities = new ArrayList<>();

        // 5. ★ 권한 부여 로직 수정: 엔티티의 role 필드 사용
        authorities.add(new SimpleGrantedAuthority(member.getRole().getValue()));

        /*
        // 기존 로직 (삭제 또는 주석 처리)
        if("admin".equals(studentId)){
            authorities.add(new SimpleGrantedAuthority(MemberRole.ADMIN.getValue()));
        }
        else{
            authorities.add(new SimpleGrantedAuthority(MemberRole.USER.getValue()));
        }
        */

        // Spring Security의 User 객체 반환
        return new User(member.getStudentId() ,member.getPasswordHash(),authorities);
    }
}