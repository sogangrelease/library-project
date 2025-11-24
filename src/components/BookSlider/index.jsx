import React, { useState, useEffect } from 'react';
import styles from './BookSlider.module.css';
import BookImage from '@/components/BookImage';

const BookSlider = ({ subject, books }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4;

    useEffect(() => {
        setCurrentIndex(0);
    }, [books]);

    const handleNext = () => {
        if (currentIndex + itemsPerPage >= books.length) return;
        setCurrentIndex((prev) => prev + itemsPerPage);
    };

    const handlePrev = () => {
        if (currentIndex === 0) return;
        setCurrentIndex((prev) => prev - itemsPerPage);
    };

    const translateX = -(currentIndex * (100 / itemsPerPage));
    const isPrevDisabled = currentIndex === 0;
    const isNextDisabled = currentIndex + itemsPerPage >= books.length;

    if (!books || books.length === 0) return null;

    return (
        <div className={styles.bookSlider}>
            <div className={styles.sliderHeader}>
                <div className={styles.sliderSubject}>{subject}</div>
                <button className={styles.moreButton} aria-label="More infomation">+</button>
            </div>

            <div className={styles.sliderBody}>
                <button 
                    className={styles.navButton} 
                    onClick={handlePrev} 
                    disabled={isPrevDisabled}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8l-4 4 4 4M16 12H8" />
                    </svg>
                </button>

                <div className={styles.sliderViewport}>
                    <div 
                        className={styles.sliderContent}
                        style={{ transform: `translateX(${translateX}%)` }}
                    >
                        {books.map((book) => (
                            <div key={book.id} className={styles.slideItem}>
                                <div className={styles.bookWrapper}>
                                    <BookImage 
                                        src={book.coverUrl} 
                                        alt={book.title} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button 
                    className={styles.navButton} 
                    onClick={handleNext}
                    disabled={isNextDisabled}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16l4-4-4-4M8 12h8" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default BookSlider;