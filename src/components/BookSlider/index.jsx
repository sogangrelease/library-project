import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BookSlider.module.css';
import BookImage from '@/components/BookImage';
import BookItem from '@/components/BookItem';

const BookSlider = ({ subject, books }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentSubject, setCurrentSubject] = useState(subject);
    const itemsPerPage = 4;
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentIndex(0);
    }, [books]);

    const navTo = (path) => {
        navigate(path);
    }

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
                <button className={styles.moreButton} onClick={() => navTo(`/search?category=${currentSubject}&page=1`)}aria-label="More infomation">
                    +
                    <span className={styles.tooltip}>카테고리 도서 더보기</span>
                </button>
            </div>

            <div className={styles.sliderBody}>
                <button 
                    className={styles.navButton} 
                    onClick={handlePrev} 
                    disabled={isPrevDisabled}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>

                <div className={styles.sliderViewport}>
                    <div 
                        className={styles.sliderContent}
                        style={{ transform: `translateX(${translateX}%)` }}
                    >
                        {books.map((book) => (
                            <div key={book.id} className={styles.slideItem}>
                                <BookItem book={book} />
                            </div>
                        ))}
                    </div>
                </div>

                <button 
                    className={styles.navButton} 
                    onClick={handleNext}
                    disabled={isNextDisabled}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default BookSlider;