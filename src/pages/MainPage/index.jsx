import BookSlider from '@/components/BookSlider';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '@/api/axios';
import BookImage from '@/components/BookImage';
import styles from './MainPage.module.css';
import releaseLogo from '@/assets/release-black-small.webp';

// const books = [
//   { 
//     id: 1, 
//     title: 'Eloquent JavaScript', 
//     publisher: 'No Starch Press', 
//     year: '2018', 
//     category: 'Programming', 
//     coverUrl: 'https://covers.openlibrary.org/b/isbn/9781593279509-M.jpg',
//     isAvailable: true 
//   },
//   { 
//     id: 2, 
//     title: 'Learning React', 
//     publisher: 'O\'Reilly', 
//     year: '2020', 
//     category: 'Programming', 
//     coverUrl: 'https://covers.openlibrary.org/b/isbn/9781492051243-M.jpg', 
//     isAvailable: true 
//   },
//   { 
//     id: 3, 
//     title: 'Python Crash Course', 
//     publisher: 'No Starch Press', 
//     year: '2019', 
//     category: 'Programming', 
//     coverUrl: 'https://covers.openlibrary.org/b/isbn/9781593279288-M.jpg', 
//     isAvailable: false 
//   },
//   { 
//     id: 4, 
//     title: 'The Web Application Hacker\'s Handbook', 
//     publisher: 'Wiley', 
//     year: '2011', 
//     category: 'Security', 
//     coverUrl: 'https://covers.openlibrary.org/b/isbn/9781118026472-M.jpg', 
//     isAvailable: true 
//   },
//   { 
//     id: 5, 
//     title: 'C++ Primer', 
//     publisher: 'Addison-Wesley', 
//     year: '2012', 
//     category: 'Programming', 
//     coverUrl: 'https://covers.openlibrary.org/b/isbn/9780321714114-M.jpg', 
//     isAvailable: false 
//   },
//   { 
//     id: 6, 
//     title: 'Artificial Intelligence: A Modern Approach', 
//     publisher: 'Pearson', 
//     year: '2020', 
//     category: 'AI', 
//     coverUrl: 'https://covers.openlibrary.org/b/isbn/9780134610993-M.jpg', 
//     isAvailable: true 
//   },
//   { 
//     id: 7, 
//     title: 'Clean Code', 
//     publisher: 'Prentice Hall', 
//     year: '2008', 
//     category: 'Software Engineering', 
//     coverUrl: 'https://covers.openlibrary.org/b/isbn/9780132350884-M.jpg', 
//     isAvailable: true 
//   },
//   { 
//     id: 8, 
//     title: 'Introduction to Algorithms (CLRS)', 
//     publisher: 'MIT Press', 
//     year: '2022', 
//     category: 'Algorithm', 
//     coverUrl: 'https://covers.openlibrary.org/b/isbn/9780262046305-M.jpg', 
//     isAvailable: true 
//   },
//   { 
//     id: 9, 
//     title: 'The Phoenix Project', 
//     publisher: 'IT Revolution Press', 
//     year: '2013', 
//     category: 'DevOps', 
//     coverUrl: 'https://covers.openlibrary.org/b/isbn/9780988262591-M.jpg', 
//     isAvailable: true 
//   },
//   { 
//     id: 10, 
//     title: 'Dune', 
//     publisher: 'Chilton Books', 
//     year: '1965', 
//     category: 'Sci-Fi', 
//     coverUrl: 'https://covers.openlibrary.org/b/isbn/9780441172719-M.jpg', 
//     isAvailable: false 
//   },
//   { 
//     id: 11, 
//     title: 'Hacking: The Art of Exploitation', 
//     publisher: 'No Starch Press', 
//     year: '2008', 
//     category: 'Security', 
//     coverUrl: 'https://covers.openlibrary.org/b/isbn/9781593271442-M.jpg', 
//     isAvailable: true 
//   }
// ];

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

const CategorySection = ({ category }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.post(`/api/books/category/${category}`)
      .then(function (response) {
        setBooks(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [category]);

  if (books.length === 0) return null;

  return (
    <BookSlider subject={category} books={books} />
  );
};

const MainPage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        api.get('/api/books')
            .then(function (response) {
                setBooks(response.data);
            })
            .catch(function (error) {
                console.error('/api/books error');
                console.error(error);
            });
    }, []);

    return (
        <div className={styles.mainPage}>
            <div className={styles.sliderGrid}>
                <img src={releaseLogo} alt="Release logo" className={styles.releaseLogo} />
                <BookSlider subject="subject1" books={books.slice(0,10)} />
                <BookSlider subject="subject1" books={books.slice(10,20)} />
                <BookSlider subject="subject1" books={books.slice(20,30)} />
                <BookSlider subject="subject1" books={books.slice(30,40)} />
                <BookSlider subject="subject1" books={books.slice(40,50)} />
                <BookSlider subject="subject1" books={books.slice(50,60)} />
            </div>
            <aside className={styles.loanStatusSidebar}>
                <LoanStatusSidebar />
            </aside>
        </div>
    );
};

export default MainPage;