import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/axios';
import styles from './DashBoard.module.css';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline, IoArrowDownCircleOutline } from "react-icons/io5";
import releaseLogo from '../../assets/release-black-small.webp'; 

const BookSection = ({ title, headerStyle, books, onReturn }) => {
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

  const handleBookClick = (book) => {
    if (window.confirm(`"${book.title}"을(를) 반납하시겠습니까?`)) {
      onReturn(book.id);
    }
  };

  const renderBookItem = (book) => {
    return (
      <div 
        key={book.id || Math.random()} 
        className={styles.bookItemContainer}
        onClick={() => handleBookClick(book)}
      >
        {book.coverUrl ? (
          <img 
            src={book.coverUrl} 
            alt={book.title} 
            className={styles.bookPlaceholder} 
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className={styles.bookPlaceholder} />
        )}
        
        {/* 책 정보 표시 */}
        <div className={styles.bookInfo}>
          <p className={styles.bookTitle}>{book.title}</p>
          <p className={styles.bookMember}>빌린 사람: {book.memberName}</p>
          <p className={styles.bookReturnDate}>반납일: {book.returnDateStr}</p>
        </div>
      </div>
    );
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

  const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '.');

  // 데이터 로드 함수
  const loadData = () => {
    setLoading(true);

    api.get('/member/getInfo')
      .then(userResponse => {
        console.log("사용자 정보 조회 성공:", userResponse.data);
        
        if (userResponse.data.role !== 'ADMIN') {
          alert('관리자만 접근 가능합니다.');
          navigate('/');
          return Promise.reject('NOT_ADMIN');
        }

        return api.get('/api/books');
      })
      .then(booksResponse => {
        console.log("전체 책 목록 조회 성공:", booksResponse.data);
        const allBooks = booksResponse.data;

        return api.get('/borrow/list').then(borrowsResponse => {
          console.log("대출 내역 조회 성공:", borrowsResponse.data);
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
            tempOverdue.push(item);
            tempUsers.push({
              id: borrow.borrowId,
              name: borrow.memberName,
              book: borrow.titleMain,
              date: item.returnDateStr
            });
          } else if (returnDate >= todayStart && returnDate < tomorrowStart) {
            tempToday.push(item);
          } else {
            tempScheduled.push(item);
          }
        });

        setOverdueBooks(tempOverdue);
        setReturnTodayBooks(tempToday);
        setScheduledBooks(tempScheduled);
        setOverdueUsers(tempUsers);
      })
      .catch(error => {
        if (error === 'NOT_ADMIN') return;
        console.error("데이터를 불러오지 못했습니다.", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, [navigate]);

  // 반납 처리
  const handleReturn = (borrowId) => {
    api.delete(`/return/${borrowId}`)
      .then(response => {
        console.log("반납 성공:", response.data);
        alert("반납이 완료되었습니다.");
        loadData(); // 새로고침
      })
      .catch(error => {
        console.error("반납 실패:", error);
        alert("반납 처리 중 오류가 발생했습니다.");
      });
  };

  if (loading) return <div className={styles.container}><p style={{paddingTop: '200px'}}>Loading...</p></div>;

  return (
    <div className={styles.container}>
      <div className={styles.contentGrid}>
        <img src={releaseLogo} alt="Release Logo" className={styles.logoImage} />

        <div className={styles.leftColumn}>
          <BookSection 
            title="연체 도서" 
            headerStyle={styles.headerRed} 
            books={overdueBooks}
            onReturn={handleReturn}
          />

          <BookSection 
            title={`반납 예정일 ${todayStr}`} 
            headerStyle={styles.headerOrange} 
            books={returnTodayBooks}
            onReturn={handleReturn}
          />

          <BookSection 
            title="반납 예정 도서" 
            headerStyle={styles.headerYellow} 
            books={scheduledBooks}
            onReturn={handleReturn}
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