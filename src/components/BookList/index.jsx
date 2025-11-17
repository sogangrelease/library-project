import React from 'react';
import BookItem from '@/components/BookItem';
import styles from './BookList.module.css';

const books = [
  { 
    id: 1, 
    title: '책 제목 1', 
    publisher: '출판사 A', 
    year: '2025', 
    category: '카테고리 1', 
    coverUrl: '',
    isAvailable: true 
  },
  { 
    id: 2, 
    title: '책 제목 2', 
    publisher: '출판사 B', 
    year: '2024', 
    category: '카테고리 2', 
    coverUrl: '', 
    isAvailable: true 
  },
  { 
    id: 3, 
    title: '책 제목 3', 
    publisher: '출판사 C', 
    year: '2023', 
    category: '카테고리 1', 
    coverUrl: '', 
    isAvailable: false 
  },
  { 
    id: 4, 
    title: '책 제목 4', 
    publisher: '출판사 A', 
    year: '2022', 
    category: '카테고리 3', 
    coverUrl: '', 
    isAvailable: false 
  },
];

const BookList = () => {
  return (
    <div className={styles.bookList}>
      {books.map((book, index) => (
        <React.Fragment key={book.id}>
          <BookItem book={book} /> 
          {index < books.length - 1 && (
            <hr className={styles.divider} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BookList;