package com.release.library.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotEmpty;

@Getter
@Setter
public class BookRequestDto {

    private String coverUrl;

    @NotEmpty(message = "제목은 필수 항목입니다.")
    private String titleMain;

    @NotEmpty(message = "카테고리는 필수 항목입니다.")
    private String category;

    private String language;
    private String description;
    private String index;
    private String author;

    // ID, createdAt 등 DB 전용 필드는 포함하지 않습니다.
}
