import styles from './LogOutButton.module.css';

// ✅ Header.jsx에서 전달받은 onLogout 함수를 props로 받습니다.
const LogOutButton = ({ onLogout }) => {
    return (
        // ✅ onClick 이벤트에 onLogout 함수를 연결합니다.
        <button 
            className={styles.logOutButton}
            onClick={onLogout} 
        >
            Log Out
        </button>
    );
};

export default LogOutButton;