import React, { useRef, useState, useEffect } from 'react';
import styles from './DashBoard.module.css';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline, IoArrowDownCircleOutline } from "react-icons/io5";
import releaseLogo from '../../assets/release-black-small.webp'; 

// 도서 섹션 컴포넌트 (스크롤 포함)
const BookSection = ({ title, headerStyle, books }) => {
  const listRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  // 스크롤 상태 체크
  const checkScroll = () => {
    if (listRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
      
      // 왼쪽 화살표: 스크롤이 0보다 크면 보임
      setShowLeft(scrollLeft > 0);
      
      // 오른쪽 화살표: 스크롤 가능한 영역이 남았으면 보임 (오차범위 1px)
      setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  // 초기 로딩 및 데이터 변경 시 스크롤 상태 확인
  useEffect(() => {
    checkScroll();
    // 창 크기 변해도 화살표 유무 다시 체크
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [books]);

  // 좌우 이동 함수
  const scroll = (direction) => {
    if (listRef.current) {
      const scrollAmount = 300; // 한 번에 이동할 픽셀 수 (책 2~3권 너비)
      listRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // 책 렌더링 헬퍼
  const renderBookItem = (book) => {
    if (book.coverImage) {
      return (
        <img 
          key={book.id} 
          src={book.coverImage} 
          alt={book.title} 
          className={styles.bookPlaceholder} 
          style={{ objectFit: 'cover' }}
        />
      );
    }
    return <div key={book.id} className={styles.bookPlaceholder} />;
  };

  return (
    <div className={styles.bookSection}>
      <div className={`${styles.sectionHeader} ${headerStyle}`}>
        <span className={styles.headerTitle}>{title}</span>
        <span className={styles.headerPlus}>+</span>
      </div>
      
      <div className={styles.carouselContainer}>
        {/* 왼쪽 화살표: showLeft가 true일 때만 보임 */}
        <button 
          className={`${styles.arrowBtn} ${!showLeft ? styles.hidden : ''}`} 
          onClick={() => scroll('left')}
        >
          <IoArrowBackCircleOutline />
        </button>
        
        {/* 도서 리스트 (스크롤 영역) */}
        <div 
          className={styles.bookList} 
          ref={listRef} 
          onScroll={checkScroll} // 스크롤 할 때마다 화살표 상태 체크
        >
          {/* 데이터가 없으면 아무것도 안 나옴 (빈 화면) */}
          {books && books.length > 0 ? (
            books.map((book) => renderBookItem(book))
          ) : (
            null
          )}
        </div>

        {/* 오른쪽 화살표: showRight가 true일 때만 보임 */}
        <button 
          className={`${styles.arrowBtn} ${!showRight ? styles.hidden : ''}`} 
          onClick={() => scroll('right')}
        >
          <IoArrowForwardCircleOutline />
        </button>
      </div>
    </div>
  );
};

// 메인 대시보드 컴포넌트
const DashBoard = () => {
  
  // 테스트 위한 더미 데이터
  const overdueBooks = [
    { id: 1, title: '책1', coverImage: null },
    { id: 2, title: '책2', coverImage: null }, 
    { id: 3, title: '책3', coverImage: null },
    { id: 4, title: '책4', coverImage: null },
    { id: 5, title: '책5', coverImage: null }, // 스크롤 테스트용 추가
    { id: 6, title: '책6', coverImage: null },
  ];

  const returnTodayBooks = [
    { id: 7, title: '책7', coverImage: null },
    { id: 8, title: '책8', coverImage: null },
    { id: 9, title: '책9', coverImage: null },
  ];

  const scheduledBooks = [
    // 비어있으면 화살표도 안 나오고 책도 안 나옴
  ];

  const overdueUsers = [
    { id: 1, name: '김00', book: '대출한 책 제목', date: '2000.00.00' },
    { id: 2, name: '이00', book: '리액트 프로그래밍', date: '2025.11.01' },
    { id: 3, name: '박00', book: '데이터베이스 개론', date: '2025.10.15' },
    { id: 4, name: '최00', book: '알고리즘 인터뷰', date: '2025.12.01' },
    { id: 5, name: '정00', book: '클린 코드', date: '2025.09.20' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.contentGrid}>
        
        {/* 로고 */}
        <img src={releaseLogo} alt="Release Logo" className={styles.logoImage} />

        {/* === [왼쪽 컬럼] === */}
        <div className={styles.leftColumn}>
          
          {/* (1) 연체 도서 (BookSection 컴포넌트 사용) */}
          <BookSection 
            title="연체 도서" 
            headerStyle={styles.headerRed} 
            books={overdueBooks} 
          />

          {/* (2) 반납 예정일 */}
          <BookSection 
            title="반납 예정일 2000.00.00" 
            headerStyle={styles.headerOrange} 
            books={returnTodayBooks} 
          />

           {/* (3) 반납 예정 도서 */}
          <BookSection 
            title="반납 예정 도서" 
            headerStyle={styles.headerYellow} 
            books={scheduledBooks} 
          />

        </div>

        {/* 연체자 */}
        <div className={styles.overdueUserSection}>
          <div className={styles.userHeader}>
            <span className={styles.userHeaderTitle}>연체자</span>
          </div>
          
          <div className={styles.userListContainer}>
            {overdueUsers.map((user) => (
              <div key={user.id} className={styles.userItem}>
                <div className={styles.userName}>{user.name}</div>
                <div className={styles.overdueBookTitle}>{user.book}</div>
                <div className={styles.returnDate}>반납일 : {user.date}</div>
              </div>
            ))}
          </div>

          <div className={styles.bottomArrowContainer}>
            <IoArrowDownCircleOutline className={styles.downArrow}/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashBoard;