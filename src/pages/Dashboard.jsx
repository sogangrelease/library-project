import React from 'react';
import styles from './Dashboard.module.css';
import { Link } from 'react-router-dom';
import releaseLogo from '../assets/release-black-small.webp';

const BookCard = () => <div className={styles.bookCardPlaceholder}></div>;

const UserItem = ({ name, title, date }) => (
  <div className={styles.userItem}>
    <p className={styles.userItemText}><strong>{name}</strong></p>
    <p className={styles.userItemText}>{title}</p>
    <p className={styles.userItemDate}>반납일: {date}</p>
  </div>
);

function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <div className={styles.headerLeft}>
          <span>관리자페이지 | 관리</span>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.headerButton}>Management</button>
          <button className={styles.headerButton}>Log Out</button>
        </div>
      </header>

      <main className={styles.dashboardMain}>
        <div className={styles.leftColumn}>
          <Link to="/" className={styles.dashboardLogo}>
            <img src={releaseLogo} alt="Custom Logo" className={styles.dashboardLogoImage} />
          </Link>
          
          <section className={styles.bookSection}>
            <div className={`${styles.sectionHeader} ${styles.orange}`}>
              <span>연체 도서</span>
              <button className={styles.sectionButton}>+</button>
            </div>
            <div className={styles.bookList}>
              <button className={styles.scrollArrow}>&lt;</button>
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
              <button className={styles.scrollArrow}>&gt;</button>
            </div>
          </section>

          <section className={styles.bookSection}>
            <div className={`${styles.sectionHeader} ${styles.lightOrange}`}>
              <span>반납 예정일 2000.00.00</span>
              <button className={styles.sectionButton}>+</button>
            </div>
            <div className={styles.bookList}>
              <button className={styles.scrollArrow}>&lt;</button>
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
              <button className={styles.scrollArrow}>&gt;</button>
            </div>
          </section>

          <section className={styles.bookSection}>
            <div className={`${styles.sectionHeader} ${styles.yellow}`}>
              <span>반납 예정 도서</span>
              <button className={styles.sectionButton}>+</button>
            </div>
            <div className={styles.bookList}>
              <button className={styles.scrollArrow}>&lt;</button>
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
              <button className={styles.scrollArrow}>&gt;</button>
            </div>
          </section>
        </div>

        <div className={styles.rightColumn}>
          <section className={styles.userListSection}>
            <div className={`${styles.sectionHeader} ${styles.orange}`}>
              <span>연체자</span>
            </div>
            <div className={styles.userList}>
              <UserItem name="김00" title="대출한 책 제목" date="2000.00.00" />
              <UserItem name="김00" title="대출한 책 제목" date="2000.00.00" />
              <UserItem name="김00" title="대출한 책 제목" date="2000.00.00" />
              <UserItem name="김00" title="대출한 책 제목" date="2000.00.00" />
              <UserItem name="김00" title="대출한 책 제목" date="2000.00.00" />
            </div>
            <button className={styles.addUserButton}>+</button>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;