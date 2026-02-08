import styles from './MobilePage.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import api from '@/api/axios';
import LayoutBox from '@/components/LayoutBox';
import LayoutWidthConstraint from '@/components/LayoutWidthConstraint';
import BookImage from '@/components/BookImage';
import Header from '@/components/header'
import releaseLogo from '@/assets/release-black-small.webp';

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

function MobilePage({ children }) {

    const [isOpen, setIsOpen] = useState(false);

    const handlersOpen = useSwipeable({
        onSwipedLeft: () => setIsOpen(true),
        trackMouse: true
    });

    const handlersClose = useSwipeable({
        onSwipedRight: () => setIsOpen(false),
        trackMouse: true
    });

    return (
        <div className={styles.page}>
            <Header />
            <div className={styles.pageOutline}>
                <Link to="/" className={styles.logoButton}>
                    <img src={releaseLogo} alt="Release logo" className={styles.releaseLogo} />
                </Link>
                <div className={styles.container}>
                    {children}
                </div>
                <div {...handlersOpen} className={styles.sidebarOpenHandler} />

                {isOpen && (
                    <div onClick={() => setIsOpen(false)} className={styles.backdrop} />
                )}
                <aside {...handlersClose} className={styles.sidebar} style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}>
                    <LoanStatusSidebar/>
                </aside>
            </div>
        </div>
    );
}

export default MobilePage;