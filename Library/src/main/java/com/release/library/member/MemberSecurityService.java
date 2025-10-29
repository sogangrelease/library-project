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
    @Override
    public UserDetails loadUserByUsername(String studentId) throws UsernameNotFoundException{
        //1. 회원 검색 => findByUsername
            throw new UsernameNotFoundException("존재하지 않는 회원입니다.");
        }
        //4. 권한 부여를 위한 리스트 생성
        List<GrantedAuthority> authorities = new ArrayList<>();

        //5. admin 사용자인 경우 관리자 권한 부여, 외에는 일반 유저 권한 부여 => .add() + MemberRole.java
        if("admin".equals(studentId)){
        }
        else{
        }



    }
}
