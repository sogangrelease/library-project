import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/axios';
import styles from './DashBoard.module.css';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline, IoArrowDownCircleOutline } from "react-icons/io5";
import releaseLogo from '../../assets/release-black-small.webp'; 

const BookSection = ({ title, headerStyle, books }) => {
  const listRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    if (listRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [books]);

  const scroll = (direction) => {
    if (listRef.current) {
      const scrollAmount = 300;
      listRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const renderBookItem = (book) => {
    if (book.coverUrl) {
      return (
        <img 
          key={book.id || Math.random()} 
          src={book.coverUrl} 
          alt={book.title} 
          className={styles.bookPlaceholder} 
          style={{ objectFit: 'cover' }}
        />
      );
    }
    return <div key={book.id || Math.random()} className={styles.bookPlaceholder} />;
  };

  return (
    <div className={styles.bookSection}>
      <div className={`${styles.sectionHeader} ${headerStyle}`}>
        <span className={styles.headerTitle}>{title}</span>
        <span className={styles.headerPlus}>+</span>
      </div>
      
      <div className={styles.carouselContainer}>
        <button 
          className={`${styles.arrowBtn} ${!showLeft ? styles.hidden : ''}`} 
          onClick={() => scroll('left')}
        >
          <IoArrowBackCircleOutline />
        </button>
        
        <div className={styles.bookList} ref={listRef} onScroll={checkScroll}>
          {books && books.length > 0 ? books.map(renderBookItem) : null}
        </div>

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
  const navigate = useNavigate();
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [returnTodayBooks, setReturnTodayBooks] = useState([]);
  const [scheduledBooks, setScheduledBooks] = useState([]);
  const [overdueUsers, setOverdueUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 오늘 날짜
  const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '.');

  useEffect(() => {
    setLoading(true);

    // 관리자 권한 확인
    api.post('/member/getInfo')
      .then(userResponse => {
        console.log("✅ 사용자 정보 조회 성공:", userResponse.data);
        
        // 관리자가 아니면 메인 페이지로
        if (userResponse.data.role !== 'ADMIN') {
          alert('관리자만 접근 가능합니다.');
          navigate('/');
          return Promise.reject('NOT_ADMIN');
        }

        // 전체 책 목록 가져오기
        return api.post('/api/books');
      })
      .then(booksResponse => {
        console.log("✅ 전체 책 목록 조회 성공:", booksResponse.data);
        const allBooks = booksResponse.data;

        // 전체 대출 내역 가져오기 (관리자 전용)
        return api.post('/borrow/list').then(borrowsResponse => {
          console.log("✅ 대출 내역 조회 성공:", borrowsResponse.data);
          return { allBooks, allBorrows: borrowsResponse.data };
        });
      })
      .then(({ allBooks, allBorrows }) => {
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrowStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

        const tempOverdue = [];
        const tempToday = [];
        const tempScheduled = [];
        const tempUsers = [];

        allBorrows.forEach(borrow => {
          const bookInfo = allBooks.find(b => b.titleMain === borrow.titleMain);
          const coverUrl = bookInfo ? bookInfo.coverUrl : null;
          
          const returnDate = new Date(borrow.returnAt);
          
          const item = {
            id: borrow.borrowId,
            title: borrow.titleMain,
            coverUrl: coverUrl,
            memberName: borrow.memberName,
            returnDateStr: returnDate.toISOString().slice(0, 10).replace(/-/g, '.')
          };

          if (returnDate < todayStart) {
            // 연체
            tempOverdue.push(item);
            tempUsers.push({
              id: borrow.borrowId,
              name: borrow.memberName,
              book: borrow.titleMain,
              date: item.returnDateStr
            });
          } else if (returnDate >= todayStart && returnDate < tomorrowStart) {
            // 오늘 반납
            tempToday.push(item);
          } else {
            // 반납 예정
            tempScheduled.push(item);
          }
        });

        setOverdueBooks(tempOverdue);
        setReturnTodayBooks(tempToday);
        setScheduledBooks(tempScheduled);
        setOverdueUsers(tempUsers);
      })
      .catch(error => {
        if (error === 'NOT_ADMIN') {
          return;
        }
        console.error("데이터를 불러오지 못했습니다.", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <div className={styles.container}><p style={{paddingTop: '200px'}}>Loading...</p></div>;

  return (
    <div className={styles.container}>
      <div className={styles.contentGrid}>
        <img src={releaseLogo} alt="Release Logo" className={styles.logoImage} />

        {/* 왼쪽 컬럼 */}
        <div className={styles.leftColumn}>
          
          {/* 연체 도서 */}
          <BookSection 
            title="연체 도서" 
            headerStyle={styles.headerRed} 
            books={overdueBooks} 
          />

          {/* 반납 예정일 (오늘 날짜) */}
          <BookSection 
            title={`반납 예정일 ${todayStr}`} 
            headerStyle={styles.headerOrange} 
            books={returnTodayBooks} 
          />

           {/* 반납 예정 도서 (내일 이후) */}
          <BookSection 
            title="반납 예정 도서" 
            headerStyle={styles.headerYellow} 
            books={scheduledBooks} 
          />

        </div>

        <div className={styles.overdueUserSection}>
          <div className={styles.userHeader}>
            <span className={styles.userHeaderTitle}>연체자</span>
          </div>
          
          <div className={styles.userListContainer}>
            {overdueUsers.length > 0 ? (
              overdueUsers.map((user) => (
                <div key={user.id} className={styles.userItem}>
                  <div className={styles.userName}>{user.name}</div>
                  <div className={styles.overdueBookTitle}>{user.book}</div>
                  <div className={styles.returnDate}>반납일 : {user.date}</div>
                </div>
              ))
            ) : (
              <div style={{padding: '20px', textAlign: 'center', color: '#666'}}>
                현재 연체자가 없습니다.
              </div>
            )}
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