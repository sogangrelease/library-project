import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom'; // 로고 클릭 시 홈으로

const BookCard = () => <div className="book-card-placeholder"></div>;

const UserItem = ({ name, title, date }) => (
  <div className="user-item">
    <p><strong>{name}</strong></p>
    <p>{title}</p>
    <p className="user-item-date">반납일: {date}</p>
  </div>
);

function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* 1. 상단 헤더 */}
      <header className="dashboard-header">
        <div className="header-left">
          <span>관리자페이지 | 관리</span>
        </div>
        <div className="header-right">
          <button className="header-button">Management</button>
          <button className="header-button">Log Out</button>
        </div>
      </header>

      {/* 2. 메인 컨텐츠 */}
      <main className="dashboard-main">
        {/* 2-1. 왼쪽 컬럼 */}
        <div className="left-column">
          {/* 로고 (클릭 시 홈으로) */}
          <Link to="/" className="dashboard-logo">
            <img src="/release-black.png" alt="Custom Logo" className="dashboard-logo-image" />
          </Link>
          
          {/* 연체 도서 */}
          <section className="book-section">
            <div className="section-header orange">
              <span>연체 도서</span>
              <button>+</button>
            </div>
            <div className="book-list">
              <button className="scroll-arrow">&lt;</button>
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
              <button className="scroll-arrow">&gt;</button>
            </div>
          </section>

          {/* 반납 예정일 */}
          <section className="book-section">
            <div className="section-header light-orange">
              <span>반납 예정일 2000.00.00</span>
              <button>+</button>
            </div>
            <div className="book-list">
              <button className="scroll-arrow">&lt;</button>
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
              <button className="scroll-arrow">&gt;</button>
            </div>
          </section>

          {/* 반납 예정 도서 */}
          <section className="book-section">
            <div className="section-header yellow">
              <span>반납 예정 도서</span>
              <button>+</button>
            </div>
            <div className="book-list">
              <button className="scroll-arrow">&lt;</button>
              <BookCard />
              <BookCard />
              <BookCard />
              <BookCard />
              <button className="scroll-arrow">&gt;</button>
            </div>
          </section>
        </div>

        {/* 2-2. 오른쪽 컬럼 */}
        <div className="right-column">
          <section className="user-list-section">
            <div className="section-header orange">
              <span>연체자</span>
            </div>
            <div className="user-list">
              <UserItem name="김00" title="대출한 책 제목" date="2000.00.00" />
              <UserItem name="김00" title="대출한 책 제목" date="2000.00.00" />
              <UserItem name="김00" title="대출한 책 제목" date="2000.00.00" />
              <UserItem name="김00" title="대출한 책 제목" date="2000.00.00" />
              <UserItem name="김00" title="대출한 책 제목" date="2000.00.00" />
            </div>
            <button className="add-user-button">+</button>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;