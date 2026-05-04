import Header from '@/components/header';
import SearchPage from '@/pages/SearchPage';
import MainPage from '@/pages/MainPage';
import MyPage from '@/pages/MyPage';
import BookDetail from '@/pages/BookDetail';
import DashBoard from '@/pages/DashBoard';
import AddBoard from '@/pages/AddBoard';
import Login from '@/pages/Login';
import LayoutedMainPage from '@/pages/LayoutedPages/LayoutedMainPage'
import LayoutedMyPage from '@/pages/LayoutedPages/LayoutedMyPage'
import LayoutedBookDetail from '@/pages/LayoutedPages/LayoutedBookDetail';
import MobileMainPage from '@/pages/MobilePages/MobileMainPage'
import MobileMyPage from '@/pages/MobilePages/MobileMyPage'
import ProtectedRoute from '@/components/ProtectedRoute';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';


const App = () => {
  const location = useLocation();

  // Login 페이지에서는 Header 숨기기
  const hideHeader = location.pathname === '/login' || location.pathname.startsWith('/Mobile');

  return (
    <div className="app-container">
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/mypage" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
        <Route path="/addboard" element={<ProtectedRoute><AddBoard /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:id" element={<BookDetail />} />
        <Route path="/LayoutedMainPage" element={<LayoutedMainPage />} />
        <Route path="/LayoutedMyPage" element={<ProtectedRoute><LayoutedMyPage /></ProtectedRoute>} />
        <Route path="/LayoutedBookDetail" element={<LayoutedBookDetail />} />
        <Route path="/MobileMainPage" element={<MobileMainPage />} />
        <Route path="/MobileMyPage" element={<ProtectedRoute><MobileMyPage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;
