import React, { useState } from 'react';
import styles from './BookDetail.module.css';
import { Link } from 'react-router-dom';
import releaseLogo from '../assets/release-black-small.webp';

function BookDetail() { 
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className={styles.appContainer}>
      <main className={styles.mainContent}>
        <div className={styles.logoContainer}>
          <img src={releaseLogo} alt="Custom Logo" className={styles.customHeaderLogo} />
        </div>

        <section className={styles.bookDetailsSection}>
          <div className={styles.bookCover}></div>
          <div className={styles.bookInfo}>
            <h1 className={styles.bookTitle}>Book Title</h1>
            <p className={styles.bookInfoText}><strong>저자:</strong> 저자명</p>
            <p className={styles.bookInfoText}><strong>발행사항:</strong> 출판사, 발행연도</p>
            <p className={styles.bookInfoText}><strong>카테고리:</strong> 카테고리명</p>
            <p className={styles.bookInfoText}><strong>언어:</strong> 언어</p>
            
            <button
              className={`${styles.loanButton} ${isAvailable ? styles.available : styles.unavailable}`}
              disabled={!isAvailable}
              onClick={() => {
                if(isAvailable) {
                  alert('대출이 완료되었습니다.');
                  setIsAvailable(false);
                }
              }}
            >
              {isAvailable ? '대출' : '대출 불가'}
            </button>
          </div>
        </section>

        <section className={styles.tabSection}>
          <nav className={styles.tabNav}>
            <button
              className={`${styles.tabButton} ${activeTab === 'details' ? styles.active : ''}`}
              onClick={() => setActiveTab('details')}
            >
              상세 설명
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'toc' ? styles.active : ''}`}
              onClick={() => setActiveTab('toc')}
            >
              목차
            </button>
          </nav>
          <div className={styles.tabContent}>
            {activeTab === 'details' ? (
              <div>
                <p className={styles.tabInfoText}>책 상세 설명...</p>
              </div>
            ) : (
              <div>
                <ul className={styles.tocList}>
                  <li className={styles.tocItem}>1장: 첫 번째</li>
                  <li className={styles.tocItem}>2장: 두 번째</li>
                  <li className={styles.tocItem}>3장: 세 번째</li>
                </ul>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default BookDetail;