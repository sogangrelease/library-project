package com.release.library.book;

import com.release.library.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public List<Book> searchBooks(String title, String category){
        if(title.isEmpty() && category.isEmpty()) { //제목 카테고리 모두 선택 안하고 그냥 검색시 전체 리스트 반환
            List<Book> bookList = this.bookRepository.findAll();
            return bookList;
        }
        else if(category.isEmpty()){ // 제목은 입력하고 카테고리만 선택 안할 시 제목 부분포함 리턴
            List <Book> bookList = this.bookRepository.findByTitleMainContains(title);
            return bookList;
        }
        else{ //둘 다 입력해줬다면 제목은 부분일치, 카테고리는 완전 일치로 검색
            List <Book> bookList = this.bookRepository.findByTitleMainContainsAndCategory(title,category);
            return bookList;
        }


    }
}
