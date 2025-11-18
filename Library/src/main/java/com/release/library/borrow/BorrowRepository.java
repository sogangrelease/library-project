package com.release.library.borrow;

import com.release.library.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BorrowRepository extends JpaRepository<Borrow, Long> {
    //테이블에 해당 멤버가 몇 줄 있는지 카운트
    long countByMember(Member member);
}
