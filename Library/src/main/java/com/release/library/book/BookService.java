package com.release.library.book;

import com.release.library.DataNotFoundException;
import com.release.library.dto.BookDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BookService {

    private final BookRepository bookRepository;
    //모든 책 찾기
    public List<BookDto> getAllBooks() {
        List<Book> bookList = this.bookRepository.findAll();
        return bookList.stream()
                .map(book -> {
                    BookDto dto = new BookDto();
                    dto.setId(book.getId());
                    dto.setCoverUrl(book.getCoverUrl());
                    dto.setTitleMain(book.getTitleMain());
                    dto.setCategory(book.getCategory());
                    dto.setLanguage(book.getLanguage());
                    dto.setDescription(book.getDescription());
                    dto.setIndex(book.getIndex());
                    dto.setAuthor(book.getAuthor());
                    dto.setLoaned(book.isLoaned()); // 대출여부만 포함
                    return dto;
                })
                .collect(Collectors.toList());
    }

    //해당 책 한 권 찾기
    public Book getBook(Long id) {

        Optional<Book> book =  this.bookRepository.findById(id);
        if(book.isPresent()) {
            return book.get();
        }
        else{
            throw new DataNotFoundException("Todotitle Not Found");
        }
    }

    public BookDto getBookDto(Long id) {
        Optional<Book> book =  this.bookRepository.findById(id);
        if(book.isPresent()) {
            BookDto dto = new BookDto();
            dto.setId(book.get().getId());
            dto.setCoverUrl(book.get().getCoverUrl());
            dto.setTitleMain(book.get().getTitleMain());
            dto.setCategory(book.get().getCategory());
            dto.setLanguage(book.get().getLanguage());
            dto.setDescription(book.get().getDescription());
            dto.setIndex(book.get().getIndex());
            dto.setAuthor(book.get().getAuthor());
            dto.setLoaned(book.get().isLoaned());
            return dto;
        }else{
            throw new DataNotFoundException("Book Not Found");
        }
    }

    // 카테고리 별 책 찾기
    public List<BookDto> searchByCategory(String category) {

        List<Book> bookList = this.bookRepository.findByCategory(category);

        return bookList.stream()
                .map(book -> {
                    BookDto dto = new BookDto();
                    dto.setId(book.getId());
                    dto.setCoverUrl(book.getCoverUrl());
                    dto.setTitleMain(book.getTitleMain());
                    dto.setCategory(book.getCategory());
                    dto.setLanguage(book.getLanguage());
                    dto.setDescription(book.getDescription());
                    dto.setIndex(book.getIndex());
                    dto.setAuthor(book.getAuthor());
                    dto.setLoaned(book.isLoaned()); // 대출여부만 포함
                    return dto;
                })
                .collect(Collectors.toList());
    }



    //이미지 변환
    public String saveCoverImage(MultipartFile coverFile) throws IOException {
        if (coverFile == null || coverFile.isEmpty()) {
            return null;
        }
        String uploadDir = "C:/Library/book-covers/";

        // 업로드 경로 디렉터리 생성 (존재하지 않을 경우)
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // 파일명 중복 방지 UUID 사용, 원본 확장자 유지
        String originalFilename = coverFile.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        String savedFileName = UUID.randomUUID().toString() + extension;
        Path filePath = uploadPath.resolve(savedFileName);

        // 실제 파일 저장
        coverFile.transferTo(filePath.toFile());

        // 클라이언트에 반환할 URL, 서비스에 따라 다름 (여기선 상대경로 예시)
        return "C:/Library/book-covers/" + savedFileName;
    }



    //새로운 책 등록
    public void create(String coverUrl, String titleMain,String category,String language,
                       String description,String index,String author)
    {
        Book newBook = new Book();
        newBook.setCoverUrl(coverUrl);
        newBook.setTitleMain(titleMain);
        newBook.setCategory(category);
        newBook.setLanguage(language);
        newBook.setDescription(description);
        newBook.setIndex(index);
        newBook.setAuthor(author);

        this.bookRepository.save(newBook);
    }

    // 제목과 카테고리 동시 검색 (Null 및 빈 문자열 안전성 강화)
    public List<BookDto> searchBooks(String title, String category) {
        // null이 들어올 경우를 대비해 trim() 및 isBlank()를 사용하여 안전하게 처리
        final String safeTitle = (title != null) ? title.trim() : "";
        final String safeCategory = (category != null) ? category.trim() : "";

        List<Book> bookList;

        // 1. 제목/카테고리 모두 비어있을 때 (공백이나 null 포함)
        if (safeTitle.isBlank() && safeCategory.isBlank()) {
            // 전체 리스트 반환
            bookList = this.bookRepository.findAll();
        }
        // 2. 카테고리만 비어있을 때 (제목은 입력됨)
        else if (safeCategory.isBlank()) {
            // 제목 부분 포함 검색 (title에 대한 메서드가 있다면 사용)
            // 가정: bookRepository.findByTitleMainContains(safeTitle)
            bookList = this.bookRepository.findByTitleMainContains(safeTitle);
        }
        // 3. 둘 다 입력되었을 때
        else {
            // 제목 부분일치 AND 카테고리 완전 일치 검색
            // 가정: bookRepository.findByTitleMainContainsAndCategory(safeTitle, safeCategory)
            bookList = this.bookRepository.findByTitleMainContainsAndCategory(safeTitle, safeCategory);
        }

        // Book 엔티티 리스트를 BookDto 리스트로 변환하여 반환
        return bookList.stream()
                .map(book -> {
                    BookDto dto = new BookDto();
                    dto.setId(book.getId());
                    dto.setCoverUrl(book.getCoverUrl());
                    dto.setTitleMain(book.getTitleMain());
                    dto.setCategory(book.getCategory());
                    dto.setLanguage(book.getLanguage());
                    dto.setDescription(book.getDescription());
                    dto.setIndex(book.getIndex());
                    dto.setAuthor(book.getAuthor());
                    dto.setLoaned(book.isLoaned()); // 대출여부만 포함
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
