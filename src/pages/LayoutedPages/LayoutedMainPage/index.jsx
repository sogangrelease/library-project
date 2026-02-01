import LayoutBookSlider from '@/components/LayoutBookSlider';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LayoutPage from '@/components/LayoutPage';
import LayoutBox from '@/components/LayoutBox';
import api from '@/api/axios';
import BookImage from '@/components/BookImage';
import styles from './LayoutedMainPage.module.css';
import LayoutWidthConstraint from '@/components/LayoutWidthConstraint';

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
        <LayoutBox title="대출 현황" buttonOnClick={() => navTo('/mypage')} buttonLabel="대출 현황 펴기" buttonChildren="+">
            <LayoutWidthConstraint>
                {myLoans.length > 0 ? (
                    myLoans.map((loan) => (
                        <LoanItem key={loan.borrowId} book={loan} />
                    ))
                ) : (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#999', fontSize: '14px' }}>
                        대출 중인 도서가<br/>없습니다.
                    </div>
                )}
            </LayoutWidthConstraint>
        </LayoutBox>
        /*
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
        */
    );
};

const LoanItem = ({ book }) => {
    
    const date = new Date(book.returnAt);
    
    const formattedReturnDate = date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).replace(/\s/g, ''); 

    return (
        <div className={styles.loanItem}>
            <BookImage src={book.coverUrl} alt={book.titleMain}/>
            <div className={styles.loanItemDetails}>
                <p>반납예정일</p>
                <p>{formattedReturnDate}</p> 
            </div>
        </div>
    );
};

// 카테고리별 도서 목록을 가져오는 컴포넌트
const CategorySection = ({ category }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
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
        <LayoutBookSlider subject={category} books={books} />
    );
};

const LayoutedMainPage = () => {

    const categories = ['CS/Math', 'Web/App', 'Infra', 'AI', 'Others'];

    return (
        <LayoutPage>
            <div className={styles.pageOutline}>
                {categories.map((category) => (
                    <CategorySection key={category} category={category} />
                ))}
            </div>
            <aside>
                <LoanStatusSidebar />
            </aside>
        </LayoutPage>
        /*
        <div className={styles.mainPage}>
            <div className={styles.sliderGrid}>
                <img src={releaseLogo} alt="Release logo" className={styles.releaseLogo} />
                
                {categories.map((category) => (
                    <CategorySection key={category} category={category} />
                ))}

            </div>
            <aside className={styles.loanStatusSidebar}>
                <LoanStatusSidebar />
            </aside>
        </div>
        */
    );
};

export default LayoutedMainPage;