import styles from './MyPageButton.module.css';
import { useNavigate } from 'react-router-dom';

const MyPageButton = () => {
    const navigate = useNavigate();
    const navTo = (path) => {
        navigate(path);
    };

    return (
        <button onClick={() => navTo('/mypage')}className={styles.myPageButton}>
            My Page
        </button>
    );
};

export default MyPageButton;