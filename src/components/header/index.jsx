import SearchBar from '@/components/SearchBar';
import MyPageButton from '@/components/MyPageButton';
import LogOutButton from '@/components/LogOutButton';
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