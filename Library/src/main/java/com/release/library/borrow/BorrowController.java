package com.release.library.borrow;

import com.release.library.DataNotFoundException;
import com.release.library.book.Book;
import com.release.library.book.BookService;
import com.release.library.dto.BookDto;
import com.release.library.dto.BorrowListDto;
import com.release.library.dto.MyBorrowListDto;
import com.release.library.member.Member;
import com.release.library.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;


@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:5173")
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

        //책 두권이상이면 오류 메시지
        try {
            this.borrowService.create(member, book);
        }catch(DataNotFoundException e){
            return ResponseEntity.status(422).body(e.getMessage());
        }
        //해당 책 상세정보 페이지로 돌아가기.(프론트에서 할 일)
        return ResponseEntity.ok("대출 성공");
    }

    //반납
    @PreAuthorize("hasRole('ADMIN')") //관리자 권한 필요
    @DeleteMapping("/return/{id}") //여기서 id는 bookId가 아니라 borrowId
    public ResponseEntity<String> returnBook(@PathVariable("id") Long id) {
        Borrow borrow = this.borrowService.getBorrow(id);
        this.borrowService.returnBook(borrow);
        return ResponseEntity.ok("반납 성공");
    }

    //대여 내역 전체 조회
    //관리자 페이지에서 전체 조회할 거라 관리자만 사용 가능하게 분리
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/borrow/list")
    public ResponseEntity<List<BorrowListDto>> getBorrowList(){
        List<BorrowListDto> borrowList = this.borrowService.getBorrowList();
        return ResponseEntity.ok(borrowList);
    }

    //해당 유저의 대여 내역 조회
    //마이페이지에서 조회
    @GetMapping("/my/borrow/list")
    public ResponseEntity<List<MyBorrowListDto>> getMyBorrowList(Principal principal){
        Member member = this.memberService.getMember(principal.getName());
        List<MyBorrowListDto> borrowList = this.borrowService.getMyBorrowList(member);
        System.out.println("개인 대여 내역 조회 성공");
        return ResponseEntity.ok(borrowList);
    }
}
