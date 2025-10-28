package com.Release.Library.Book;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class BookController {

    private final BookService bookService;
    private com.Release.Library.Book.BookService BookService;

    @GetMapping("/main")
    public String mainPage(Model model) {

        List<Book> book = this.BookService.getAllBooks();

        return "main_page";
    }
}
