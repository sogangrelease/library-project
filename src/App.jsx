import SearchBar from './components/search-bar/searchBar';
import SearchPage from './pages/SearchPage';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <SearchBar />
      <SearchPage />
    </div>
  );
};

export default App;