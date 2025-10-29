package com.release.library.book;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class BookController {

    private final BookService bookService;

    //메인 페이지 로딩
    @GetMapping("/main")
    public String getAllBooks(Model model) {

        List<Book> bookList = this.bookService.getAllBooks();
        model.addAttribute("bookList", bookList);
        return "main_page";
    }

    //책 상세 정보
    @GetMapping("/book/detail/{id}")
    public String detailPage(@PathVariable Long id, Model model) {
        Book book = this.bookService.getBook(id);
        model.addAttribute("book", book);
        return "book_detail";
    }

    //카테고리로 검색
    @GetMapping("/book/{category}")
    public String searchByCategory(@PathVariable String category, Model model) {
        List<Book> bookList = this.bookService.searchByCategory(category);
        model.addAttribute("bookList", bookList);
        return "search_page";
    }

    //책 등록(관리자 권한)
    @PostMapping("/book/add")
    public String addBook(@RequestParam("Book") Book book) {

        this.bookService.create(book.getTitleMain(),book.getCategory(),book.getLanguage(),
                                book.getDescription(),book.getIndex(),book.getAuthor());

        //관리자 페이지로 다시 리턴
        return "redirect:/admin/page";
    }


}
