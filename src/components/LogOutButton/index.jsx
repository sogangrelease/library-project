import styles from './LogOutButton.module.css';
import { FiLogOut } from "react-icons/fi";

const LogOutButton = ({ onLogout }) => {
    return (
        <button 
            className={styles.circleButton}
            onClick={onLogout} 
            data-tooltip="Log Out"
        >
            <FiLogOut size={24} style={{ marginLeft: '4px' }} />
        </button>
    );
};

export default LogOutButton;