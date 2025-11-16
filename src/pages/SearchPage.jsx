import releaseLogo from './assets/release-black-small.webp';
import styles from './SearchPage.module.css';
import SearchQuery from './SearchQuery';
import BookList from './BookList';

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