import styles from './MyPageButton.module.css';
import { useNavigate } from 'react-router-dom';

const MyPageButton = () => {
    const navigate = useNavigate();

    return (
        <button 
            className={styles.circleButton} 
            onClick={() => navigate('/mypage')}
            data-tooltip="My Page" // 말풍선에 뜰 텍스트
        >
            M
        </button>
    );
};

export default MyPageButton;