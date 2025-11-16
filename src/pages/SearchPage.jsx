import releaseLogo from '../assets/release-black-small.webp';
import styles from './SearchPage.module.css';
import SearchQuery from '../components/search-query/SearchQuery';
import BookList from '../components/book-list/BookList';

const SearchPage = () => {
    return (
        <div className={styles.searchPage}>
            <img src={releaseLogo} alt="Release logo" className={styles.releaseLogo} />
            <SearchQuery />
            <BookList />
        </div>
    );
};

export default SearchPage;