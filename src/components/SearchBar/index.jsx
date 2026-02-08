import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import styles from './searchBar.module.css';

const SearchBar = ({ categories }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/search?keyword=${searchTerm}&category=${selectedCategory}&page=1`);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <div className={styles.searchBar}>
            <select
                className={styles.categorySelectDropDown}
                value={selectedCategory}
                onChange={handleCategoryChange}
            >
                <option value=''>모든 카테고리</option>
                {categories.map((category) => (
                    <option key={category.value} value={category.value}>{String(category.label)}</option>
                ))}
            </select>
            <input 
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className={styles.searchInput}
            />
            <button onClick={handleSearch} className={styles.searchButton}>
                <IoSearch />
            </button>
        </div>
    );
}

export default SearchBar;