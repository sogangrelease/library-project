import Header from '@/components/Header';
import SearchPage from '@/pages/SearchPage';
import MainPage from '@/pages/MainPage';
import MyPage from '@/pages/MyPage';
import BookDetail from '@/pages/BookDetail';
import DashBoard from '@/pages/DashBoard';
// import AddBoard from '@/pages/AddBoard';
import Login from '@/pages/Login';
import { Routes, Route } from 'react-router-dom';
import './App.css';


const App = () => {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/book" element={<BookDetail />} />
        <Route path="/dashboard" element={<DashBoard />} />
        {/* <Route path="/addboard" element={<AddBoard />} /> */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;