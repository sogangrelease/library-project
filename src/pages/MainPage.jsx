import BookSlider from '../components/book-slider/BookSlider';
import BookImage from '../components/book-image/BookImage';
import styles from './MainPage.module.css';
import releaseLogo from '../assets/release-black-small.webp';

const books = [
  { 
    id: 1, 
    title: 'Eloquent JavaScript', 
    publisher: 'No Starch Press', 
    year: '2018', 
    category: 'Programming', 
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781593279509-M.jpg',
    isAvailable: true 
  },
  { 
    id: 2, 
    title: 'Learning React', 
    publisher: 'O\'Reilly', 
    year: '2020', 
    category: 'Programming', 
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781492051243-M.jpg', 
    isAvailable: true 
  },
  { 
    id: 3, 
    title: 'Python Crash Course', 
    publisher: 'No Starch Press', 
    year: '2019', 
    category: 'Programming', 
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781593279288-M.jpg', 
    isAvailable: false 
  },
  { 
    id: 4, 
    title: 'The Web Application Hacker\'s Handbook', 
    publisher: 'Wiley', 
    year: '2011', 
    category: 'Security', 
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781118026472-M.jpg', 
    isAvailable: true 
  },
  { 
    id: 5, 
    title: 'C++ Primer', 
    publisher: 'Addison-Wesley', 
    year: '2012', 
    category: 'Programming', 
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780321714114-M.jpg', 
    isAvailable: false 
  },
  { 
    id: 6, 
    title: 'Artificial Intelligence: A Modern Approach', 
    publisher: 'Pearson', 
    year: '2020', 
    category: 'AI', 
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780134610993-M.jpg', 
    isAvailable: true 
  },
  { 
    id: 7, 
    title: 'Clean Code', 
    publisher: 'Prentice Hall', 
    year: '2008', 
    category: 'Software Engineering', 
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780132350884-M.jpg', 
    isAvailable: true 
  },
  { 
    id: 8, 
    title: 'Introduction to Algorithms (CLRS)', 
    publisher: 'MIT Press', 
    year: '2022', 
    category: 'Algorithm', 
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780262046305-M.jpg', 
    isAvailable: true 
  },
  { 
    id: 9, 
    title: 'The Phoenix Project', 
    publisher: 'IT Revolution Press', 
    year: '2013', 
    category: 'DevOps', 
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780988262591-M.jpg', 
    isAvailable: true 
  },
  { 
    id: 10, 
    title: 'Dune', 
    publisher: 'Chilton Books', 
    year: '1965', 
    category: 'Sci-Fi', 
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780441172719-M.jpg', 
    isAvailable: false 
  },
  { 
    id: 11, 
    title: 'Hacking: The Art of Exploitation', 
    publisher: 'No Starch Press', 
    year: '2008', 
    category: 'Security', 
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781593271442-M.jpg', 
    isAvailable: true 
  }
];

const LoanStatusSidebar = () => {
    return (
        <div className={styles.loanStatusContent}>
            <div className={styles.loanHeader}>
                <span>대출 현황</span>
                <button>+</button>
            </div>
            <div className={styles.loanList}>
                <LoanItem book={books[0]} />
                <LoanItem book={books[2]} />
                <LoanItem book={books[9]} />
            </div>
        </div>
    );
};

const LoanItem = ({ book }) => {
    return (
        <div className={styles.loanItem}>
            <BookImage src={book.coverUrl} alt={book.title}/>
            <div className={styles.loanItemDetails}>
                <p>반납예정일</p>
                <p>2026.01.10</p>
            </div>
        </div>
    );
};

const MainPage = () => {
    return (
        <div className={styles.mainPage}>
            <div className={styles.sliderGrid}>
                <img src={releaseLogo} alt="Release logo" className={styles.releaseLogo} />
                <BookSlider subject="subject1" books={books}/>
                <BookSlider subject="subject2" books={books}/>
                <BookSlider subject="subject3" books={books}/>
                <BookSlider subject="subject4" books={books}/>
                <BookSlider subject="subject5" books={books}/>
                <BookSlider subject="subject6" books={books}/>
            </div>
            <aside className={styles.loanStatusSidebar}>
                <LoanStatusSidebar />
            </aside>
        </div>
    );
};

export default MainPage;