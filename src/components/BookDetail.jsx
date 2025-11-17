import React, { useState } from 'react';
import './BookDetail.css';
import { Link } from 'react-router-dom';

function BookDetail() { 
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="search-bar">
          <input type="search" placeholder="Search" />
          <button>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zM2 6.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z"
                fill="#000000"
              />
            </svg>
          </button>
        </div>
        <Link to="/dashboard" className="my-page-link">My Page</Link>
      </header>

      <main className="main-content">
        <div className="logo-container">
          <img src="/release-black.png" alt="Custom Logo" className="custom-header-logo" />
        </div>

        <section className="book-details-section">
          <div className="book-cover"></div>
          <div className="book-info">
            <h1>Book Title</h1>
            <p><strong>저자:</strong> 저자명</p>
            <p><strong>발행사항:</strong> 출판사, 발행연도</p>
            <p><strong>카테고리:</strong> 카테고리명</p>
            <p><strong>언어:</strong> 언어</p>
            
            <button
              className={`loan-button ${isAvailable ? 'available' : 'unavailable'}`}
              disabled={!isAvailable}
              onClick={() => {
                if(isAvailable) {
                  alert('대출이 완료되었습니다.');
                  setIsAvailable(false);
                }
              }}
            >
              {isAvailable ? '대출' : '대출 불가'}
            </button>
          </div>
        </section>

        <section className="tab-section">
          <nav className="tab-nav">
            <button
              className={activeTab === 'details' ? 'active' : ''}
              onClick={() => setActiveTab('details')}
            >
              상세 설명
            </button>
            <button
              className={activeTab === 'toc' ? 'active' : ''}
              onClick={() => setActiveTab('toc')}
            >
              목차
            </button>
          </nav>
          <div className="tab-content">
            {activeTab === 'details' ? (
              <div>
                <p>책 상세 설명...</p>
              </div>
            ) : (
              <div>
                <ul>
                  <li>1장: 첫 번째</li>
                  <li>2장: 두 번째</li>
                  <li>3장: 세 번째</li>
                </ul>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default BookDetail;