import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import styles from './searchBar.module.css';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const navTo = (path) => {
        navigate(path);
    }

    return (
        <div className={styles.searchBar}>
            <input 
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
            />
            <button onClick={() => navTo(`/search?q=${searchTerm}`)}className={styles.searchButton}><IoSearch></IoSearch></button>
        </div>
    );
}

export default SearchBar;