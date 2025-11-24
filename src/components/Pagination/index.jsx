import styles from './Pagination.module.css'

const Pagination = ({ currentPage, totalPages, maxPageButtons, onPageChange }) => {
    const getPaginationArray = () => {
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

        const paginationArray = [];
        for (let i = start; i <= end; i++) {
            paginationArray.push(i);
        }

        return paginationArray;
    };

    const paginationArray = getPaginationArray();

    if (totalPages === 0) return null;

    return (
        <div className={styles.paginationDiv}>
            <button onClick={() => onPageChange(currentPage - 1)} className={styles.pageBtn}>&lt;</button>
            {paginationArray.map((n, i) =>(
                <button key={i}onClick={() => onPageChange(n)} className={n == currentPage ? styles.active : styles.pageBtn}>{n}</button>
            ))}
            <button onClick={() => onPageChange(currentPage + 1)} className={styles.pageBtn}>&gt;</button>
        </div>
    );
}

export default Pagination;