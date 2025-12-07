import { useState } from 'react';
import styles from './BookItem.module.css';
import { useNavigate } from 'react-router-dom';

const BookItem = ({ book }) => {
  const navigate = useNavigate();

  const navTo = (path) => {
      navigate(path);
  }

  return (
    <button onClick={() => navTo(`/detail/${book.id}`)}className={styles.bookItem}>
        <div className={styles.bookCover}>
            <img src={book.coverUrl || `https://placehold.co/200x300/e0e0e0/909090?text=${book.title}`} alt={`${book.title} cover`} />
        </div>
        <div className={styles.bookDetails}>
            <h2 className={styles.bookTitle}>{book.titleMain}</h2>
            <p className={styles.bookAuthor}>{book.author}</p>
        </div>
    </button>
  );
};

export default BookItem;