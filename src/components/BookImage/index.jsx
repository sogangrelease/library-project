import styles from './BookImage.module.css';

const BookImage = ({ src, alt }) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
    const BOOKCOVER_URL = import.meta.env.VITE_BOOKCOVER_URL || '/book-covers/';
    
    return <div className={styles.bookImage}>
        <img src={API_BASE_URL + BOOKCOVER_URL + src} alt={alt} />
    </div>;
}

export default BookImage;