import { IoSearch } from 'react-icons/io5';
import styles from './searchBar.module.css';

const SearchBar = () => {
    return (
        <div className={styles.searchBar}>
            <input 
                type="text"
                placeholder="Search"
                className={styles.searchInput}
            />
            <button className={styles.searchButton}><IoSearch></IoSearch></button>
        </div>
    );
}

export default SearchBar;