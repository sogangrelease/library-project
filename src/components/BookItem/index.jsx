import { useState } from 'react';
import styles from './BookItem.module.css';
import { useNavigate } from 'react-router-dom';

const BookItem = ({ book }) => {
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
  const BOOKCOVER_URL = import.meta.env.VITE_BOOKCOVER_URL || '/book-covers/';

  const navTo = (path) => {
      navigate(path);
  }

  return (
    <button onClick={() => navTo(`/detail/${book.id}`)} className={styles.bookItem} title={book.titleMain}>
        <div className={styles.bookCover}>
            <img src={API_BASE_URL + BOOKCOVER_URL + book.coverUrl || `https://placehold.co/200x300/e0e0e0/909090?text=${book.title}`} alt={`${book.title} cover`} />
        </div>
        <div className={styles.bookDetails}>
            <h2 className={styles.bookTitle}>{book.titleMain}</h2>
            <p className={styles.bookAuthor}>{book.author}</p>
        </div>
    </button>
  );
};

export default BookItem;