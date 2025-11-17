import releaseLogo from '../assets/release-black-small.webp';
import styles from './SearchPage.module.css';
import SearchQuery from '../components/search-query/SearchQuery';
import BookList from '../components/book-list/BookList';
import { useSearchParams } from 'react-router-dom'

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    return (
        <div className={styles.searchPage}>
            <img src={releaseLogo} alt="Release logo" className={styles.releaseLogo} />
            <SearchQuery query={query}/>
            <BookList />
        </div>
    );
};

export default SearchPage;