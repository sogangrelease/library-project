import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import styles from './searchBar.module.css';

const SearchBar = ({ categories }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const navigate = useNavigate();

    const navTo = (path) => {
        navigate(path);
    }
    
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    }

    return (
        <div className={styles.searchBar}>
            <select
                className={styles.categorySelectDropDown}
                value={selectedCategory}
                onChange={handleCategoryChange}
            >
                <option value='all'>모든 카테고리</option>
                {categories.map((category) => (
                    <option key={category} value={category}>{String(category)}</option>
                ))}
            </select>
            <input 
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
            />
            <button onClick={() => navTo(`/search?keyword=${searchTerm}&category=${selectedCategory}&page=1`)}className={styles.searchButton}><IoSearch></IoSearch></button>
        </div>
    );
}

export default SearchBar;