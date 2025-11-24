import styles from './Pagnation.module.css'

const Pagnation = ({ currentPage, totalPages, maxPageButtons, onPageChange }) => {
    const getPagnationArray = () => {
        if (totalPages <= maxPageButtons) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const half = Math.floor(maxPageButtons / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, currentPage + half);

        if (currentPage <= half) {
            end = Math.min(totalPages, maxPageButtons);
        }

        if (currentPage + half > totalPages) {
            start = Math.max(1, totalPages - maxPageButtons + 1);
        }

        const pagnationArray = [];
        for (let i = start; i <= end; i++) {
            pagnationArray.push(i);
        }

        return pagnationArray;
    };

    const pagnationArray = getPagnationArray();

    if (totalPages === 0) return null;

    return (
        <div className={styles.pagnationDiv}>
            <button onClick={() => onPageChange(currentPage - 1)} className={styles.pageBtn}>&lt;</button>
            {pagnationArray.map((n, i) =>(
                <button key={i}onClick={() => onPageChange(n)} className={n == currentPage ? styles.active : styles.pageBtn}>{n}</button>
            ))}
            <button onClick={() => onPageChange(currentPage + 1)} className={styles.pageBtn}>&gt;</button>
        </div>
    );
}

export default Pagnation;