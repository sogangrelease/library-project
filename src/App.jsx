import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BookDetail from './components/BookDetail'; // 기존 App.jsx 컴포넌트
import Dashboard from './components/Dashboard';   // 새로 만들 대시보드 컴포넌트

function App() {
  return (
    <Routes>
      {/* 기본 경로 책 상세 페이지로 설정 */}
      <Route path="/" element={<BookDetail />} /> 
      
      {/* '/dashboard' 경로 새 와이어프레임 페이지로 설정 */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;