package com.release.library.borrow;

import com.release.library.book.Book;
import com.release.library.book.BookService;
import com.release.library.member.Member;
import com.release.library.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;


@RequiredArgsConstructor
@RestController
public class BorrowController {
    private final BorrowService borrowService;
    private final MemberService memberService;
    private final BookService bookService;

    //대출
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/borrow/{id}")
    public ResponseEntity<String> borrow(@PathVariable("id") Long id, Principal principal) {
        //유저 찾기
        Member member = this.memberService.getMember(principal.getName());
        Book book = this.bookService.getBook(id);

        // 이미 대여 중인지 확인
        if (book.isLoaned()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("현재 이용 중인 책이므로 대출이 불가능합니다.");
        }

        this.borrowService.create(member,book);
        //해당 책 상세정보 페이지로 돌아가기.(프론트에서 할 일)
        return ResponseEntity.ok("대출 성공");
    }

    //반납
    @PreAuthorize("hasRole('ADMIN')") //관리자 권한 필요
    @PostMapping("/return/{id}") //여기서 id는 bookId가 아니라 borrowId
    public ResponseEntity<String> returnBook(@PathVariable("id") Long id) {
        Borrow borrow = this.borrowService.getBorrow(id);
        this.borrowService.returnBook(borrow);
        return ResponseEntity.ok("반납 성공");
    }

    //대여 내역 전체 조회
    //관리자 페이지에서 전체 조회할 거라 관리자만 사용 가능하게 분리
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/borrow/list")
    public ResponseEntity<List<Borrow>> getBorrowList(){
        List<Borrow> borrowList = this.borrowService.getBorrowList();
        return ResponseEntity.ok(borrowList);
    }
}
