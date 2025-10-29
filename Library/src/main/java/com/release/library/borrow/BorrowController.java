package com.release.library.borrow;

import com.release.library.member.Member;
import com.release.library.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.security.Principal;


@RequiredArgsConstructor
@Controller
public class BorrowController {
    private final BorrowService borrowService;
    private final MemberService memberService;

    //대출
    @GetMapping("/borrow/{id}")
    public String borrow(@PathVariable("id") int id, Model model, Principal principal) {
        //유저 찾기
        Member member = this.memberService.getMember(principal.getName());


        //해당 책 상세정보 페이지로 돌아가기.
        return "redirect:/book/detail/" + id;
    }
}
