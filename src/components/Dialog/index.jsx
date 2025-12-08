import styles from './Dialog.module.css';

function Dialog({ title, dialogRef, onClose, children }) {

    return <dialog ref={dialogRef} className={styles.dialog} onClose={onClose}>
        <div className={styles.container}>
            <div className={styles.box}>
                <header className={styles.barHeader}>
                    <p className={styles.barHeaderTitle}>{title}</p>
                    <button className={styles.barHeaderButton} onClick={onClose}>x</button>
                </header>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    </dialog>
}

export default Dialog;