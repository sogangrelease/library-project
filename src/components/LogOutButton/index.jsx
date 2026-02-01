import styles from './LogOutButton.module.css';

const LogOutButton = ({ onLogout }) => {
    return (
        <button 
            className={styles.circleButton}
            onClick={onLogout} 
            data-tooltip="Log Out"
        >
            L
        </button>
    );
};

export default LogOutButton;