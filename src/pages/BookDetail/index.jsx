import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './BookDetail.module.css';
import releaseLogo from '@/assets/release-black-small.webp';

function BookDetail() { 
  const { id } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. 책 상세 정보 가져오기 (자동 전환 기능 포함)
  useEffect(() => {
    const fetchBookInfo = async () => {
      setLoading(true);

      // 더미 데이터 정의 (실패 시 사용할 데이터)
      const mockData = {
        id: id || 1,
        titleMain: "임시 책 제목 (서버 연결 실패)",
        author: "홍길동",
        publisher: "테스트 출판사",
        category: "소설",
        language: "한국어",
        coverUrl: null, 
        index: "1장. 서론\n2장. 본론\n3장. 결론",
        description: "현재 백엔드 서버와 연결할 수 없어 임시 데이터를 보여주고 있습니다.\n\n서버를 켜면 실제 데이터가 나옵니다.",
        isLoaned: false
      };

      try {
        // 더미데이터 출력위한 에러(테스트용, 나중엔 삭제!!)
        throw new Error("강제 에러 발생");

        // [시도] 백엔드에 요청 (timeout: 1초 설정)
        // 1초 안에 응답이 없으면 에러로 간주하고 catch로 넘어감
        const response = await axios.get(`/api/books/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          timeout: 1000
        });

        // [성공] 서버 데이터 사용
        console.log("✅ 백엔드 연결 성공!");
        const data = response.data;
        
        setBookInfo({
          id: data.id,
          title: data.titleMain,
          author: data.author,
          publisher: "", 
          category: data.category,
          language: data.language,
          coverImage: data.coverUrl,
          toc: data.index ? data.index.split('\n') : [],
          description: data.description
        });
        setIsAvailable(!data.isLoaned);

      } catch (error) {
        // [실패] 서버 연결 실패 혹은 에러 발생 -> 더미 데이터 사용
        console.warn("⚠️ 백엔드 연결 실패, 더미 데이터를 사용합니다.", error);
        
        setBookInfo({
          id: mockData.id,
          title: mockData.titleMain,
          author: mockData.author,
          publisher: mockData.publisher,
          category: mockData.category,
          language: mockData.language,
          coverImage: mockData.coverUrl,
          toc: mockData.index.split('\n'),
          description: mockData.description
        });
        setIsAvailable(!mockData.isLoaned);
      } finally {
        // 성공이든 실패든 로딩 종료
        setLoading(false);
      }
    };
    fetchBookInfo();
  }, [id]);

  const handleLoan = async () => {
    try {
      await axios.post(`/borrow/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      alert('대출이 완료되었습니다.');
      setIsAvailable(false);

    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("현재 이용 중인 책이므로 대출이 불가능합니다.");
      }
      else if (error.response && error.response.status === 422) {
        alert("2권 이상 대여 중이라 추가 대출이 불가능합니다.");
      }
      else {
        alert("대출 처리 중 오류가 발생했습니다.");
        console.error(error);
      }
    }
  };

  if (loading) return <div className={styles.appContainer}>Loading...</div>;
  if (!bookInfo) return <div className={styles.appContainer}>책 정보가 없습니다.</div>;

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
              onClick={handleLoan}
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