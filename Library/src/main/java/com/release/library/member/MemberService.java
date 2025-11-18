package com.release.library.member;

import com.release.library.DataNotFoundException;
import com.release.library.dto.MemberListDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder; // ★ PasswordEncoder 임포트
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder; // ★ SecurityConfig에서 정의된 빈(Bean) 주입

    //유저 찾아서 반환 (학번으로 찾음)
    public Member getMember(String studentId) {
        Optional<Member> member = this.memberRepository.findByStudentId(studentId);
        if ( member.isPresent() ) {
            return member.get();
        }
        else {
            // 이 예외는 Controller에서 404 Not Found로 처리될 수 있습니다.
            throw new DataNotFoundException( "Member Not Found!!" );
        }
    }


    // 비밀번호 보안 처리, 권한 설정 후 데이터베이스에 저장
    public void create(String studentId, String password,String phoneNumber,String name) {
        // 중복 검사는 Controller 또는 이 메서드 초기에 추가하는 것이 좋습니다.
        if (memberRepository.findByStudentId(studentId).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 학번입니다.");
        }

        Member member = new Member();
        member.setStudentId(studentId);

        // PasswordEncoder 빈 사용
        member.setPasswordHash(passwordEncoder.encode(password));

        //이름 전화번호 모두 저장해주기
        member.setPhoneNumber(phoneNumber);
        member.setName(name);
        // 권한 설정 로직 추가
        if ("admin".equals(studentId)) {
            member.setRole(MemberRole.ADMIN);
        } else {
            member.setRole(MemberRole.USER);
        }

        //데이터베이스에 저장
        this.memberRepository.save(member);
    }

    //비밀번호 변경
    public void changePassword(Member member ,String newpw){
        // PasswordEncoder 빈 사용
        member.setPasswordHash(passwordEncoder.encode(newpw));
        //데이터베이스에 저장
        this.memberRepository.save(member);
    }

    public List<MemberListDto> getMemberList(){
        List<Member> members = memberRepository.findAll();

        return members.stream()
                .map(member -> {
                    MemberListDto dto = new MemberListDto();
                    dto.setStudentId(member.getStudentId());
                    dto.setName(member.getName());
                    dto.setPhoneNumber(member.getPhoneNumber());
                    dto.setRole(member.getRole());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    //멤버 삭제
    @Transactional
    public void deleteMemeber(Member member){
        memberRepository.delete(member);
    }
}