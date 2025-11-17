import SearchBar from '../search-bar/SearchBar';
import MyPageButton from '../my-page-button/MyPageButton';
import LogOutButton from '../log-out-button/LogOutButton';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.leftSection}></div>
            <div className={styles.centerSection}>
                <SearchBar />
            </div>
            <div className={styles.rightSection}>
                <MyPageButton />
                <LogOutButton />
            </div>
        </header>
    );
};

export default Header;