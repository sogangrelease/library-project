import React, { useState } from 'react';
import styles from './BookDetail.module.css';
import releaseLogo from '@/assets/release-black-small.webp';

function BookDetail() { 
  const [isAvailable, setIsAvailable] = useState(true);

  const bookInfo = {
    id: 1,
    title: "책 제목",
    author: "저자명",
    publisher: "출판사, 발행년도",
    category: "카테고리명",
    language: "언어",
    // 책 표지 이미지 URL
    coverImage: null, 
    // 목차 리스트 (배열)
    toc: [
      "1장: 서론",
      "2장: 본론",
      "3장: 본론",
      "4장: 결론",
      "부록: "
    ],
    // 상세 설명
    description: `이 책은 1890년 영국에서부터 시작되어...
    
    줄거리 및 서평 작성
    백엔드에서 받아온 텍스트 삽입.`
  };

  return (
    <div className={styles.appContainer}>
      
      {/* 메인 컨텐츠 박스 */}
      <main className={styles.mainContent}>
        
        {/* 로고 */}
        <img src={releaseLogo} alt="Release Logo" className={styles.customHeaderLogo} />

        {/* 1. 상단 책 정보 섹션 */}
        <section className={styles.bookDetailsSection}>
          {/* 책 표지: 이미지가 있으면 img 태그, 없으면 기존 회색 박스 유지 */}
          {bookInfo.coverImage ? (
            <img 
              src={bookInfo.coverImage} 
              alt={bookInfo.title} 
              className={styles.bookCover} // 사이즈 CSS 유지
            />
          ) : (
            <div className={styles.bookCover}></div>
          )}
          
          <div className={styles.bookInfo}>
            <h1 className={styles.bookTitle}>{bookInfo.title}</h1>
            <p className={styles.bookInfoText}>저자 : {bookInfo.author}</p>
            <p className={styles.bookInfoText}>발행사항 : {bookInfo.publisher}</p>
            <p className={styles.bookInfoText}>카테고리 : {bookInfo.category}</p>
            <p className={styles.bookInfoText}>언어 : {bookInfo.language}</p>
            
            <button
              className={`${styles.loanButton} ${isAvailable ? styles.available : styles.unavailable}`}
              disabled={!isAvailable}
              onClick={() => {
                if(isAvailable) {
                  alert('대출이 완료되었습니다.');
                  setIsAvailable(false);
                  // 백엔드 대출 요청 API
                }
              }}
            >
              {isAvailable ? '대출' : '대출 불가'}
            </button>
          </div>
        </section>

        {/* 2. 하단 분할 섹션 */}
        <section className={styles.splitSection}>
          
          {/* 왼쪽: 목차 */}
          <div className={styles.tocContainer}>
            <span className={styles.sectionTitle}>목차</span>
            <ul className={styles.listContent}>
              {/* 목차 배열을 map으로 반복 */}
              {bookInfo.toc.map((item, index) => (
                <li key={index} className={styles.listItem}>{item}</li>
              ))}
            </ul>
          </div>

          {/* 오른쪽: 상세설명 */}
          <div className={styles.detailsContainer}>
            <span className={styles.sectionTitle}>상세 설명</span>
            <div className={styles.detailText}>
              <p style={{ whiteSpace: 'pre-line' }}>
                {bookInfo.description}
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default BookDetail;