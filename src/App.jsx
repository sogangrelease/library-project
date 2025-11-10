// src/App.jsx
import React, { useState } from 'react';
import './App.css'; // 스타일을 적용하기 위해 import

function App() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className="app-container">
      {/* 1. 헤더 영역 - 검색바(중앙)와 My Page(우측) */}
      <header className="app-header">
        <div className="search-bar">
          <input type="search" placeholder="Search" />
          <button>
            {/* 'Q' 대신 검은색 돋보기 SVG 아이콘 삽입 */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zM2 6.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z"
                fill="#000000" // 검은색 돋보기
              />
            </svg>
          </button>
        </div>
        {/* My Page 링크를 header로 이동 */}
        <a href="#" className="my-page-link">My Page</a>
      </header>

      {/* 2. 메인 컨텐츠 영역
        - 로고가 main-content의 자식이 되어야 
          위치(position: relative)를 기준으로 잡을 수 있습니다.
      */}
      <main className="main-content">
        {/* 로고를 main 안으로 이동, CSS로 위치 조정 */}
        <div className="logo-container">
          <img src="/release-black.png" alt="Custom Logo" className="custom-header-logo" />
        </div>

        {/* 'My Page' 링크는 header로 이동했으므로 여기서 삭제 */}

        {/* 2-1. 책 상세 정보 섹션 */}
        <section className="book-details-section">
          {/* ... (이하 동일) ... */}
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

        {/* 2-2. 탭 섹션 */}
        <section className="tab-section">
          {/* ... (이하 동일) ... */}
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
                <p>책에 대한 상세 설명이 여기에 표시됩니다...</p>
              </div>
            ) : (
              <div>
                <ul>
                  <li>1장: 첫 번째 이야기</li>
                  <li>2장: 두 번째 이야기</li>
                  <li>3장: 세 번째 이야기</li>
                </ul>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;