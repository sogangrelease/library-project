import BookSlider from '@/components/BookSlider';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '@/api/axios';
import BookImage from '@/components/BookImage';
import styles from './MainPage.module.css';
import releaseLogo from '@/assets/release-black-small.webp';

// LoanStatusSidebar와 LoanItem 컴포넌트는 변경 없이 유지

const LoanStatusSidebar = () => {
    const navigate = useNavigate();
    const [myLoans, setMyLoans] = useState([]);

    useEffect(() => {
        api.get('/my/borrow/list')
           .then(response => {
               console.log("대출 목록 조회 성공:", response.data);
               setMyLoans(response.data);
           })
           .catch(error => {
               console.error("대출 목록 조회 실패:", error);
               setMyLoans([]);
           });
    }, []);

    const navTo = (path) => {
        navigate(path);
    }
    return (
        <div className={styles.loanStatusContent}>
            <div className={styles.loanHeader}>
                <span>대출 현황</span>
                <button onClick={() => navTo('/mypage')}>+</button>
            </div>
            <div className={styles.loanList}>
                {myLoans.length > 0 ? (
                    myLoans.map((loan) => (
                        <LoanItem key={loan.borrowId} book={loan} />
                    ))
                ) : (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#999', fontSize: '14px' }}>
                        대출 중인 도서가<br/>없습니다.
                    </div>
                )}
            </div>
        </div>
    );
};

const LoanItem = ({ book }) => {
    return (
        <div className={styles.loanItem}>
            <BookImage src={book.coverUrl} alt={book.titleMain}/>
            <div className={styles.loanItemDetails}>
                <p>반납예정일</p>
                <p>{book.returnAt}</p>
            </div>
        </div>
    );
};

// 카테고리별 도서 목록을 가져오는 컴포넌트 (API 호출 방식 GET으로 수정)
const CategorySection = ({ category }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // 서버의 GET /category 엔드포인트에 맞게 쿼리 파라미터로 요청
        api.get(`/api/books/category?category=${category}`)
            .then(function (response) {
                setBooks(response.data)
            })
            .catch(function (error) {
                console.error(`카테고리 [${category}] 도서 목록 조회 실패:`, error);
                setBooks([]);
            });
    }, [category]);

    if (books.length === 0) return null; // 책이 없으면 섹션 숨김

    return (
        <BookSlider subject={category} books={books} />
    );
};

// 메인 페이지 (5개 카테고리 섹션을 렌더링)
const MainPage = () => {
    // 요청하신 5가지 카테고리 순서 정의
    const categories = ['CS/Math', 'Web/App', 'Infra', 'AI', 'Others'];

    // 기존의 전체 도서 목록을 가져오는 useEffect 로직은 제거됨

    return (
        <div className={styles.mainPage}>
            <div className={styles.sliderGrid}>
                <img src={releaseLogo} alt="Release logo" className={styles.releaseLogo} />
                
                {/* 5개의 카테고리 섹션을 순서대로 렌더링 */}
                {categories.map((category) => (
                    <CategorySection key={category} category={category} />
                ))}

            </div>
            <aside className={styles.loanStatusSidebar}>
                <LoanStatusSidebar />
            </aside>
        </div>
    );
};

export default MainPage;