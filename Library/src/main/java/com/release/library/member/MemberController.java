package com.release.library.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequiredArgsConstructor
@Controller
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    //계정 생성 (관리자만 가능)
    @PostMapping("/create")
    public String create() {

    }

    //비밀번호 변경
    @PostMapping("/changepw")
    public String changePW(@RequestParam("oldpw") String oldpw, @RequestParam("newpw") String newpw) {

    }


}
