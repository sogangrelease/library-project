package com.release.library.book;

import com.release.library.DataNotFoundException;
import com.release.library.dto.BookListDto;
import com.release.library.dto.BookRequestDto;
import com.release.library.dto.BookSearchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity; // ResponseEntity 사용을 위해 추가
import org.springframework.web.bind.annotation.*; // @RestController, @RequestBody 사용을 위해 추가
import org.springframework.security.access.prepost.PreAuthorize; // 관리자 권한 확인을 위해 추가 (필요 시)
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Collections;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    // 1. 메인 페이지 로딩 (모든 책 목록 반환)
    @GetMapping
    public ResponseEntity<List<BookListDto>> getAllBooks() {
        List<BookListDto> bookList = this.bookService.getAllBooks();
        return ResponseEntity.ok(bookList);
    }

    // 2. 책 상세 정보
    @GetMapping("/{id}")
    public ResponseEntity<Book> detailPage(@PathVariable Long id) {
        try {
            Book book = this.bookService.getBook(id);
            // 성공적으로 책 객체를 JSON으로 반환
            return ResponseEntity.ok(book);
        } catch (DataNotFoundException e) {
            // 책을 찾지 못한 경우 404 Not Found 응답
            return ResponseEntity.notFound().build();
        }
    }

    // 3. 카테고리 검색
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Book>> searchByCategory(@PathVariable String category) {
        List<Book> bookList = this.bookService.searchByCategory(category);
        return ResponseEntity.ok(bookList); // 검색된 목록 JSON 반환
    }

    // 4. 책 등록 (관리자 권한)
    @PreAuthorize("hasRole('ADMIN')") // 관리자 권한 필수 설정
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, String>> addBook(@RequestPart("book") BookRequestDto bookDto,
                                                        @RequestPart("bookCover") MultipartFile bookCover) throws IOException
    {
        //사진 파일을 받아오기
        String coverUrl = this.bookService.saveCoverImage(bookCover);

        this.bookService.create(
                coverUrl,
                bookDto.getTitleMain(),
                bookDto.getCategory(),
                bookDto.getLanguage(),
                bookDto.getDescription(),
                bookDto.getIndex(),
                bookDto.getAuthor()
        );

        // 성공 메시지를 JSON 형태로 반환
        return ResponseEntity.ok(Collections.singletonMap("message", "Book added successfully"));
    }

    //5. 책 검색
    @PostMapping("/search")
    public ResponseEntity<List<Book>> searchBooks(@RequestBody BookSearchDto bookSearchDto) {
        String title = bookSearchDto.getTitle();
        String category = bookSearchDto.getCategory();
        List<Book> bookList = this.bookService.searchBooks(title,category);

        return ResponseEntity.ok(bookList);
    }


}