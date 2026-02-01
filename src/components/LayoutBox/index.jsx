import styles from './LayoutBox.module.css';

function HeaderButton({ onClick, label, children }) {
    if (children == null) {
        return null;
    }
    return <button className={styles.barHeaderButton} onClick={onClick} label={label}>
        {children}
    </button>
}

function LayoutBox({ title, buttonOnClick, buttonLabel, buttonChildren, children }) {
    return <div className={styles.box}>
            <header className={styles.barHeader}>
                <div className={styles.barHeaderTitle}>{title}</div>
                <HeaderButton onClick={buttonOnClick} label={buttonLabel} children={buttonChildren}/>
            </header>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    ;
}

export default LayoutBox;