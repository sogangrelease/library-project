import { useState } from 'react';
import styles from './BookItem.module.css';

const BookItem = ({ book }) => {
  return (
    <div className={styles.bookItem}>
        <div className={styles.bookCover}>
            <img src={book.coverUrl || `https://placehold.co/200x300/e0e0e0/909090?text=${book.title}`} alt={`${book.title} cover`} />
        </div>
        <div className={styles.bookDetails}>
            <h2 className={styles.bookTitle}>{book.titleMain}</h2>
            <p className={styles.bookAuthor}>{book.author}</p>
        </div>
    </div>
  );
};

export default BookItem;