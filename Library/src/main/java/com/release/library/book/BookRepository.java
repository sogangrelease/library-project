package com.release.library.book;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book,Long> {

    //카테고리로 검색
    List<Book> findByCategory(String category);
}
