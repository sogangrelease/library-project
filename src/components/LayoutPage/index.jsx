import styles from './LayoutPage.module.css';
import { Link } from 'react-router-dom';
import releaseLogo from '@/assets/release-black-small.webp';

function LayoutPage({ children }) {

    return (
        <div className={styles.pageOutline}>
            <Link to="/" className={styles.logoButton}>
                <img src={releaseLogo} alt="Release logo" className={styles.releaseLogo} />
            </Link>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    );
}

export default LayoutPage;