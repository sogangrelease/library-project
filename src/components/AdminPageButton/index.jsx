import styles from './AdminPageButton.module.css';
import { useNavigate } from 'react-router-dom';
import { MdAdminPanelSettings } from "react-icons/md";

function AdminPageButton() {
    const navigate = useNavigate();

    return (
        <button 
            className={styles.circleButton}
            onClick={() => navigate('/dashboard')}
            data-tooltip="Admin Page"
        >
            <MdAdminPanelSettings size={26} />
        </button>
    );
}

export default AdminPageButton;