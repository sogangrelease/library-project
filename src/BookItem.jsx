import { useState } from 'react';
import styles from './BookItem.module.css';

const BookItem = ({ book }) => {
  return (
    <div className={styles.bookItem}>
        <div className={styles.bookCover}>
            <img src={book.coverUrl || `https://placehold.co/200x300/e0e0e0/909090?text=${book.title}`} alt={`${book.title} cover`} />
        </div>
        <div className={styles.bookDetails}>
            <h2 className={styles.bookTitle}>{book.title}</h2>
            <p className={styles.bookInfo}>발행사항: {book.author}, {book.publisher}</p>
            <p className={styles.bookCategory}>카테고리: {book.category}</p>
            <button className={styles.bookBorrowButton} disabled={!book.isAvailable}>{book.isAvailable ? '대출' : '대출 불가'}</button>
        </div>
    </div>
  );
};

export default BookItem;