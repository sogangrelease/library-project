package com.release.library.book;

import com.release.library.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class BookService {

    private final BookRepository bookRepository;
    //모든 책 찾기
    public List<Book> getAllBooks() {

        return this.bookRepository.findAll();
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

    // 카테고리 별 책 찾기
    public List<Book> searchByCategory(String category) {

        return this.bookRepository.findByCategory(category);
    }

    //새로운 책 등록
    public void create(String titleMain,String category,String language,
                       String description,String index,String author)
    {
        Book newBook = new Book();
        newBook.setTitleMain(titleMain);
        newBook.setCategory(category);
        newBook.setLanguage(language);
        newBook.setDescription(description);
        newBook.setIndex(index);
        newBook.setAuthor(author);

        this.bookRepository.save(newBook);
    }
}
