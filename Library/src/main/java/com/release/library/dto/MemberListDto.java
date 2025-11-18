package com.release.library.dto;

import com.release.library.member.MemberRole;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MemberListDto {
    private String studentId;
    private String name;
    private String phoneNumber;
    private MemberRole role;
}
