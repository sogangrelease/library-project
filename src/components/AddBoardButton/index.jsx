import styles from './AddBoardButton.module.css';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";

function AddBoardButton() {
    const navigate = useNavigate();

    return (
        <button 
            className={styles.circleButton} 
            onClick={() => navigate('/addboard')}
            data-tooltip="Add Board"
        >
            <FaPlus size={22} />
        </button>
    );
}

export default AddBoardButton;