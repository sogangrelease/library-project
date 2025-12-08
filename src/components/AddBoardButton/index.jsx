import styles from './AddBoardButton.module.css';
import { useNavigate } from 'react-router-dom';

function AddBoardButton() {
    const navigate = useNavigate();

    return (
        <button 
            className={styles.addBoardButton}
            onClick={() => navigate('/addboard')}
        >
            Add Board
        </button>
    );
}

export default AddBoardButton;
