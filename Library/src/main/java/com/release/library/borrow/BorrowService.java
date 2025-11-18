package com.release.library.borrow;

import com.release.library.DataNotFoundException;
import com.release.library.book.Book;
import com.release.library.dto.BorrowListDto;
import com.release.library.member.Member;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BorrowService {

    public final BorrowRepository borrowRepository;

    //책 추가
    public void create(Member member, Book book){
        if(this.borrowRepository.countByMember(member)>=2){
            throw new DataNotFoundException("두권 이상 대여 중입니다.");
        }


        Borrow borrow = new Borrow();
        borrow.setMember(member);
        borrow.setBook(book);

        LocalDateTime borrowDate = LocalDateTime.now();  //현재 날짜
        LocalDateTime returnAt = borrowDate.plusWeeks(2); //2주 추가

        borrow.setReturnAt(returnAt);

        this.borrowRepository.save(borrow);
    }

    //아이디로 특정 대출 정보 가져오기
    public Borrow getBorrow(Long id){
        Optional<Borrow> borrow = this.borrowRepository.findById(id);
        if(borrow.isPresent()){
            return borrow.get(); //대여 정보를 찾으면 리턴
        }
        else{
            throw new DataNotFoundException( "대출 정보를 찾을 수 없음" ); //찾지 못하면 에러 리턴
        }
    }

    //책 반납
    @Transactional
    public void returnBook(Borrow borrow) {
        this.borrowRepository.delete(borrow);
    }

    //대출 전체 조회
    public List<BorrowListDto> getBorrowList() {
        List<Borrow> borrowList = this.borrowRepository.findAll();
        return borrowList.stream()
                .map(borrow -> {
                    BorrowListDto dto = new BorrowListDto();
                    dto.setBorrowId(borrow.getId());
                    dto.setTitleMain(borrow.getBook().getTitleMain());
                    dto.setMemberId(borrow.getMember().getId());
                    dto.setMemberName(borrow.getMember().getName());
                    dto.setReturnAt(borrow.getReturnAt());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
