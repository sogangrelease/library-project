import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
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
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [returnTodayBooks, setReturnTodayBooks] = useState([]);
  const [scheduledBooks, setScheduledBooks] = useState([]);
  const [overdueUsers, setOverdueUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 오늘 날짜
  const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '.');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // 1. 전체 책 목록 가져오기 (표지 이미지를 얻기 위함) 
        const booksResponse = await axios.get('/api/books', { headers });
        const allBooks = booksResponse.data;

        // 2. 전체 대출 내역 가져오기 (관리자 전용) 
        const borrowsResponse = await axios.post('/borrow/list', {}, { headers });
        const allBorrows = borrowsResponse.data;

        // --- 데이터 분류 로직 ---
        const now = new Date();
        // 시간을 00:00:00으로 맞춰 날짜만 비교
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrowStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

        const tempOverdue = [];
        const tempToday = [];
        const tempScheduled = [];
        const tempUsers = [];

        allBorrows.forEach(borrow => {
          // 해당 대출건의 책 정보 찾기 (표지 이미지를 위해)
          // API 명세상 BorrowListDto에는 책 ID가 없고 titleMain만 있음. 제목으로 매칭
          const bookInfo = allBooks.find(b => b.titleMain === borrow.titleMain);
          const coverUrl = bookInfo ? bookInfo.coverUrl : null;
          
          const returnDate = new Date(borrow.returnAt);
          
          // 데이터 객체 생성
          const item = {
            id: borrow.borrowId,
            title: borrow.titleMain,
            coverUrl: coverUrl,
            memberName: borrow.memberName,
            returnDateStr: returnDate.toISOString().slice(0, 10).replace(/-/g, '.')
          };

          // 날짜 비교 로직
          if (returnDate < todayStart) {
            // 1) 연체 (반납일이 오늘보다 이전)
            tempOverdue.push(item);
            
            // 연체자 리스트에도 추가
            tempUsers.push({
              id: borrow.borrowId,
              name: borrow.memberName,
              book: borrow.titleMain,
              date: item.returnDateStr
            });

          } else if (returnDate >= todayStart && returnDate < tomorrowStart) {
            // 2) 오늘 반납 (반납일이 오늘)
            tempToday.push(item);
          } else {
            // 3) 반납 예정 (미래)
            tempScheduled.push(item);
          }
        });

        setOverdueBooks(tempOverdue);
        setReturnTodayBooks(tempToday);
        setScheduledBooks(tempScheduled);
        setOverdueUsers(tempUsers);
        setLoading(false);

      } catch (error) {
        console.error("데이터를 불러오지 못했습니다.", error);
        // 에러 발생 시 더미데이터 혹은 빈 배열 유지
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className={styles.container}><p style={{paddingTop: '200px'}}>Loading...</p></div>;

  return (
    <div className={styles.container}>
      <div className={styles.contentGrid}>
        
        {/* 로고 */}
        <img src={releaseLogo} alt="Release Logo" className={styles.logoImage} />

        {/* === [왼쪽 컬럼] === */}
        <div className={styles.leftColumn}>
          
          {/* 연체 도서 */}
          <BookSection 
            title="연체 도서" 
            headerStyle={styles.headerRed} 
            books={overdueBooks} 
          />

          {/* 반납 예정일 (오늘 날짜 동적 표시) */}
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

        {/* 연체자 */}
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