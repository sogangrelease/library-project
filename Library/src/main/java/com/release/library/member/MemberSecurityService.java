package com.release.library.user;

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
public class UserSecurityService implements UserDetailsService{
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String studentId) throws UsernameNotFoundException {
        //1. 회원 검색 => findByUsername
        Optional<User> u = this.userRepository.findByStudentId(studentId);
        //2.유저 없다면
        if(u.isEmpty()){
            throw new UsernameNotFoundException("존재하지 않는 회원입니다.");
        }
        //3.유저 있다면
        User user = u.get();
        //4. 권한 부여를 위한 리스트 생성
        List<GrantedAuthority> authorities = new ArrayList<>();
        //리스트는 스프링 시큐리티 내부에서 사용자 권한을 나타내는 GrantedAuthority 객체를 보관하기 위한 것
        //GrantedAuthority 타입은 사용자 권한을 캡슐화하는 객체
        //GrantedAuthority 객체를 보관할 빈 컨테이너를 설정하는 리스트
        //특정 사용자과 승인된 리소스와 기능, 페이지에만 접근할 수 있도록 구현


        //5. admin 사용자인 경우 관리자 권한 부여, 외에는 일반 유저 권한 부여 => .add() + MemberRole.java
        if("admin".equals(studentId)){
            authorities.add(new SimpleGrantedAuthority(UserRole.ADMIN.getValue()));
        }
        else{
            authorities.add(new SimpleGrantedAuthority(UserRole.USER.getValue()));
        }



        return new User(user.getStudentId(),user.getPasswordHash(),authorities);
    }
}
