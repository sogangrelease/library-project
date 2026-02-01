import styles from './AdminPageButton.module.css';
import { useNavigate } from 'react-router-dom';

function AdminPageButton() {
    const navigate = useNavigate();

    return (
        <button 
            className={styles.circleButton}
            onClick={() => navigate('/dashboard')}
            data-tooltip="Admin Page"
        >
            A
        </button>
    );
}

export default AdminPageButton;