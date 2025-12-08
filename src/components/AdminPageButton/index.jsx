import styles from './AdminPageButton.module.css';
import { useNavigate } from 'react-router-dom';

function AdminPageButton() {
    const navigate = useNavigate();

    return (
        <button 
            className={styles.adminPageButton}
            onClick={() => navigate('/dashboard')}
        >
            Admin Page
        </button>
    );
}

export default AdminPageButton;
