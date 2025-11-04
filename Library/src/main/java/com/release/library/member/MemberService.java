package com.release.library.member;

import com.release.library.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;

    //유저 찾아서 반환 (학번으로 찾음)
    public Member getMember(String studentId) {
        Optional<Member> member = this.memberRepository.findByStudentId(studentId);
        if ( member.isPresent() ) {
            return member.get();
        }
        else {
            throw new DataNotFoundException( "Member Not Found!!" );
        }
    }


    // 비밀번호 보안 처리 후 데이터베이스에 저장
    public void create(String studentId, String password) {
        //비밀번호 암호화 후 이름과 비번 저장
        Member member = new Member();
        member.setStudentId(studentId);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        member.setPasswordHash(passwordEncoder.encode(password));
        //데이터베이스에 저장
        this.memberRepository.save(member);
    }

    //비밀번호 변경
    public void changePassword(Member member ,String newpw){
        //비밀번호 암호화
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        member.setPasswordHash(passwordEncoder.encode(newpw));
        //데이터베이스에 저장
        this.memberRepository.save(member);
    }
}
