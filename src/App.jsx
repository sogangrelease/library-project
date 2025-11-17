import Header from './components/header/Header';
import SearchPage from './pages/SearchPage';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
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
      </Routes>
    </div>
  );
};

export default App;