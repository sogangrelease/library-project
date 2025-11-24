import styles from './SearchQuery.module.css';

const SearchQuery = ({ keyword, category }) => {
    return (
        <div className={styles.searchQuery}>검색어: {keyword}, 카테고리: {category}</div>
    );
};

export default SearchQuery;