package com.release.library.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BookListDto {
    private Long id;
    private String coverUrl;
    private String titleMain;
    private String category;
    private String language;
    private String description;
    private String index;
    private String author;
    private boolean isLoaned;
}
