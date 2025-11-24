import React from 'react';
import BookItem from '@/components/BookItem';
import styles from './BookList.module.css';

const BookList = ({ books }) => {
  return (
    <div className={styles.bookList}>
      {books.map((book, index) => (
          <BookItem key={index} book={book} /> 
      ))}
    </div>
  );
};

export default BookList;