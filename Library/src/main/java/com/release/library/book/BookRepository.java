package com.release.library.book;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book,Long> {

    //카테고리로 검색
    List<Book> findByCategory(String category);

    //제목 부분일치 검색
    List<Book> findByTitleMainContains(String title);

    //제목 부분일치 , 카테고리 일치 모두 만족
    List<Book> findByTiteMaincontainsAndCategory(String title, String category);
}
