import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/api/axios';
import styles from './LayoutedBookDetail.module.css';
import LayoutPage from '@/components/LayoutPage'

function LayoutedBookDetail() {
  const { id } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. 책 상세 정보 가져오기
  useEffect(() => {
    console.log("useEffect 실행됨, id:", id);
    setLoading(true);

    // 강제로 에러 발생, 더미 데이터 테스트
    api.get(`/api/books/${id}`)
      .then(response => {
        console.log("✅ 책 상세 정보 조회 성공:", response.data);
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
        setIsAvailable(!data.loaned);
      })
      .catch(error => {
        console.error("에러 발생:", error);
        console.log("더미 데이터 설정 시작");
        
        // 더미 데이터
        const dummyData = {
          id: id || 1,
          title: "임시 책 제목 (서버 연결 실패)",
          author: "홍길동",
          publisher: "테스트 출판사",
          category: "소설",
          language: "한국어",
          coverImage: null,
          toc: ["1장. 서론", "2장. 본론", "3장. 결론"],
          description: "백엔드 서버와 연결할 수 없어 임시 데이터를 보여주고 있습니다.\n\n서버를 켜면 실제 데이터가 나옵니다."
        };
        
        console.log("설정할 더미 데이터:", dummyData);
        setBookInfo(dummyData);
        setIsAvailable(true);
      })
      .finally(() => {
        console.log("finally 실행, loading false로 변경");
        setLoading(false);
      });
  }, [id]);

  // 2. 대출 처리
  const handleLoan = () => {
    api.post(`/borrow/${id}`)
      .then(response => {
        console.log("대출 성공:", response.data);
        alert('대출이 완료되었습니다.');
        setIsAvailable(false);
      })
      .catch(error => {
        console.error("❌ 대출 실패:", error);
        
        if (error.response && error.response.status === 409) {
          alert("현재 이용 중인 책이므로 대출이 불가능합니다.");
        }
        else if (error.response && error.response.status === 422) {
          alert("2권 이상 대여 중이라 추가 대출이 불가능합니다.");
        }
        else {
          alert("대출 처리 중 오류가 발생했습니다.");
        }
      });
  };

  console.log("🎨 렌더링 상태 - loading:", loading, "bookInfo:", bookInfo);

  if (loading) return <div className={styles.appContainer}>Loading...</div>;
  if (!bookInfo) return <div className={styles.appContainer}>책 정보가 없습니다.</div>;

  return (
    <LayoutPage>
      <main className={styles.mainContent}>

        {/* 1. 상단 책 정보 섹션 */}
        <section className={styles.bookDetailsSection}>
          {bookInfo.coverImage ? (
            <img
              src={bookInfo.coverImage}
              alt={bookInfo.title}
              className={styles.bookCover}
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
    </LayoutPage>
  );
}

export default LayoutedBookDetail;
