import styles from './MyPageButton.module.css';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";

const MyPageButton = () => {
    const navigate = useNavigate();

    return (
        <button 
            className={styles.circleButton} 
            onClick={() => navigate('/mypage')}
            data-tooltip="My Page"
        >
            <FaUser size={22} />
        </button>
    );
};

export default MyPageButton;