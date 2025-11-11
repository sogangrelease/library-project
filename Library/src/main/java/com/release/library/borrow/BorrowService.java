package com.release.library.borrow;

import com.release.library.DataNotFoundException;
import com.release.library.book.Book;
import com.release.library.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class BorrowService {

    public final BorrowRepository borrowRepository;

    //책 추가
    public void create(Member member, Book book){
        Borrow borrow = new Borrow();
        borrow.setMember(member);
        borrow.setBook(book);

        LocalDateTime borrowDate = LocalDateTime.now();  //현재 날짜
        LocalDateTime returnAt = borrowDate.plusWeeks(2); //2주 추가

        borrow.setReturnAt(returnAt);

        this.borrowRepository.save(borrow);
    }

    public Borrow getBorrow(Long id){
        Optional<Borrow> borrow = this.borrowRepository.findById(id);
        if(borrow.isPresent()){
            return borrow.get(); //대여 정보를 찾으면 리턴
        }
        else{
            throw new DataNotFoundException( "대여 정보를 찾을 수 없음" ); //찾지 못하면 에러 리턴
        }
    }

    //책 반납
    public void returnBook(Borrow borrow) {
        this.borrowRepository.delete(borrow);
    }
}
