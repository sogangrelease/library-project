import styles from './BookImage.module.css';

const BookImage = ({ src, alt }) => {
    return <div className={styles.bookImage}>
        <img src={src} alt={alt} />
    </div>;
}

export default BookImage;