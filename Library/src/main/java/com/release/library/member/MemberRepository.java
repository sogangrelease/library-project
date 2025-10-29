package com.release.library.user;

import com.release.library.book.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Long> {

    User findByStudentId(String studentId);
}
