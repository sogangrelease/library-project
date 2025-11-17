package com.release.library.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BorrowListDto {
    private Long borrowId;
    private String titleMain;
    private Long memberId;
    private String memberName;
    private LocalDateTime returnAt;
}
