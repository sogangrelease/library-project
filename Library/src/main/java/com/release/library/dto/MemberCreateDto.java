package com.release.library.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberCreateDto {

    @NotEmpty(message = "학번(ID)은 필수 입력 항목입니다.")
    private String studentId;

    @NotEmpty(message = "비밀번호는 필수 입력 항목입니다.")
    private String password;

    @NotEmpty(message = "이름은 필수 입력 항목입니다.")
    private String name;

    @NotEmpty(message = "전화번호는 필수 입력 항목입니다.")
    private String phoneNumber;
}