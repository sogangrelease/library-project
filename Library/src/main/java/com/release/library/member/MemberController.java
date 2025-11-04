package com.release.library.member;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.security.Principal;


@RequiredArgsConstructor
@Controller
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;

    //로그인
    @GetMapping("/login")
    public String login(){
        return "login_page";
    }

    //계정 생성 (관리자만 가능)
    @PostMapping("/create")
    public String create(@RequestParam("studentId") String studentId,
                         @RequestParam("password") String password) {
        this.memberService.create(studentId, password);
        //관리자페이지
        return "redirect:/member/login";
    }

    //비밀번호 변경
    @PostMapping("/changepw")
    public String changePW(@RequestParam("oldpw") String oldpw,
                           @RequestParam("newpw") String newpw,
                           Principal principal,
                           HttpServletRequest request) {

        //현재 로그인 되어있는 유저 member로 가져오기
        Member member = this.memberService.getMember(principal.getName());
        //암호화 되어있는 비밀번호 조회 및 생성 위해 가져오기
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


        //비번 불일치 하면 마이페이지로 돌아가기
        if(!passwordEncoder.matches(oldpw,member.getPasswordHash())){
            return "redirect:/member/mypage";
        }

        //이제 이전 비밀번호가 일치하는 것을 알기 때문에 해당 멤버 객체와 새로운 비밀번호를 서비스로 넘겨준다.
        this.memberService.changePassword(member,newpw);

        //세션 종료시키기 (로그 아웃 시키기)
        request.getSession().invalidate();
        SecurityContextHolder.clearContext();
        //다시 로그인 화면으로 이동
        return "redirect:/member/login";
    }


}
