package com.release.library.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PasswordChangeDto {

    @NotEmpty(message = "현재 비밀번호를 입력해주세요.")
    private String oldpw;

    @NotEmpty(message = "새 비밀번호를 입력해주세요.")
    private String newpw;
}
