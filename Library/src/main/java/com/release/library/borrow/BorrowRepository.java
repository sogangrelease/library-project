package com.release.library.borrow;

import com.release.library.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BorrowRepository extends JpaRepository<Borrow, Long> {
    //테이블에 해당 멤버가 몇 줄 있는지 카운트
    long countByMember(Member member);

    //해당 멤버가 있는 대여 테이블 컬럼 가져오기
    List<Borrow> findByMember(Member member);

    //멤버가 빌린 책이 있는지 boolean값 리턴
    boolean existsByMember(Member member);
}
