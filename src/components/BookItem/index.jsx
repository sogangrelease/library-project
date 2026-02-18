import styles from './BookItem.module.css';
import BookImage from '@/components/BookImage';
import { useNavigate } from 'react-router-dom';

const BookItem = ({ book }) => {
  const navigate = useNavigate();

  const navTo = (path) => {
      navigate(path);
  }

  return (
    <button onClick={() => navTo(`/detail/${book.id}`)} className={styles.bookItem} title={book.titleMain}>
        <BookImage src={book.coverUrl} alt={`${book.titleMain} cover`} />
        <div className={styles.bookDetails}>
            <h2 className={styles.bookTitle}>{book.titleMain}</h2>
            <p className={styles.bookAuthor}>{book.author}</p>
        </div>
    </button>
  );
};

export default BookItem;