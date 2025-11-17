import SearchBar from '@/components/search-bar/SearchBar';
import MyPageButton from '@/components/my-page-button/MyPageButton';
import LogOutButton from '@/components/log-out-button/LogOutButton';
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