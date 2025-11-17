import styles from './SearchQuery.module.css';

const SearchQuery = ({ query }) => {
    return (
        <div className={styles.searchQuery}>검색어: {query}</div>
    );
};

export default SearchQuery;