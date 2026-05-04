import styles from './BookImage.module.css';

const BookImage = ({ src, alt }) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

    return <div className={styles.bookImage}>
        <img src={src ? `${API_BASE_URL}/${src}` : src} alt={alt} />
    </div>;
}

export default BookImage;