package com.release.library.member;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequiredArgsConstructor
@Controller
@RequestMapping("/user")
public class MemberController {
    private final MemberService memberService;

    //계정 생성 (관리자만 가능)
    @PostMapping("/create")
    public String create() {

        //관리자페이지
        return "redirect:/admin/page";
    }

    //비밀번호 변경
    @PostMapping("/changepw")
    public String changePW(@RequestParam("oldpw") String oldpw, @RequestParam("newpw") String newpw) {


        //다시 로그인 화면으로 이동
        return "login_page";
    }


}
