package com.release.library.member;

import com.release.library.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;

    //유저 찾아서 반환
    public Member getMember(String studentId) {
            Optional<Member> member = this.memberRepository.findByStudentId(studentId);
        if ( member.isPresent() ) {
            return member.get();
        }
        else {
            throw new DataNotFoundException( "Member Not Found~ !!" );
        }
    }
}
