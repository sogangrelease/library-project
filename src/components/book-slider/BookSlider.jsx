import styles from './BookSlider.module.css';
import BookImage from '../book-image/BookImage';

const BookSlider = ({ subject, books }) => {
    return (
        <div className={styles.bookSlider}>
            <div className={styles.sliderSubject}>{subject}</div>
            <div className={styles.sliderContent}>
                {books.map((book) => (
                    <BookImage src={book.coverUrl} alt={book.title}/>
                ))}
            </div>
        </div>
    );
};

export default BookSlider;