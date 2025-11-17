import Header from './components/header/Header';
import SearchPage from './pages/SearchPage';
import MainPage from './pages/MainPage';
import { Routes, Route } from 'react-router-dom';
import './App.css';


const App = () => {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
};

export default App;