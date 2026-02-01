import styles from './AddBoardButton.module.css';
import { useNavigate } from 'react-router-dom';

function AddBoardButton() {
    const navigate = useNavigate();

    return (
        <button 
            className={styles.circleButton} 
            onClick={() => navigate('/addboard')}
            data-tooltip="Add Board"
        >
            A
        </button>
    );
}

export default AddBoardButton;